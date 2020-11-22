// <copyright file="ButtplugConnectorMessageSorter.cs" company="Nonpolynomial Labs LLC">
// Buttplug C# Source Code File - Visit https://buttplug.io for more info about the project.
// Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
// Licensed under the BSD 3-Clause license. See LICENSE file in the project root for full license information.
// </copyright>

using System;
using System.Collections.Concurrent;
using System.Threading;
using System.Threading.Tasks;

namespace Buttplug
{
    public class ButtplugFFIMessageSorter
    {
        /// <summary>
        /// Holds count for message IDs, if needed.
        /// </summary>
        private int _counter;

        /// <summary>
        /// Gets the next available message ID. In most cases, setting the message ID is done automatically.
        /// </summary>
        public uint NextMsgId => Convert.ToUInt32(Interlocked.Increment(ref _counter));

        /// <summary>
        /// Stores messages waiting for reply from the server.
        /// </summary>
        private readonly ConcurrentDictionary<uint, TaskCompletionSource<ButtplugFFIServerMessage>> _waitingMsgs =
            new ConcurrentDictionary<uint, TaskCompletionSource<ButtplugFFIServerMessage>>();

        ~ButtplugFFIMessageSorter()
        {
            Shutdown();
        }

        public void Shutdown()
        {
            // If we've somehow destructed while holding tasks, throw exceptions at all of them.
            foreach (var task in _waitingMsgs.Values)
            {
                task.TrySetException(new Exception("Sorter has been destroyed with live tasks still in queue."));
            }
        }

        public Task<ButtplugFFIServerMessage> PrepareClientMessage(ClientMessage aMsg)
        {
            var id = NextMsgId;
            // The client always increments the IDs on outgoing messages
            aMsg.Id = id;

            var promise = new TaskCompletionSource<ButtplugFFIServerMessage>();
            _waitingMsgs.TryAdd(id, promise);
            return promise.Task;
        }

        public Task<ButtplugFFIServerMessage> PrepareDeviceMessage(DeviceMessage aMsg)
        {
            var id = NextMsgId;
            // The client always increments the IDs on outgoing messages
            aMsg.Id = id;

            var promise = new TaskCompletionSource<ButtplugFFIServerMessage>();
            _waitingMsgs.TryAdd(id, promise);
            return promise.Task;
        }

        public void CheckMessage(ButtplugFFIServerMessage aMsg)
        {
            // We'll never match a system message, those are server -> client only.
            if (aMsg.Id == 0)
            {
                throw new ButtplugMessageException("Cannot sort message with System ID");
            }

            // If we haven't gotten a system message and we're not currently waiting for the message
            // id, throw.
            if (!_waitingMsgs.TryRemove(aMsg.Id, out var queued))
            {
                throw new ButtplugMessageException("Message with non-matching ID received.");
            }

            if (aMsg.Message.MsgCase == ButtplugFFIServerMessage.Types.FFIMessage.MsgOneofCase.ServerMessage &&
                aMsg.Message.ServerMessage.MsgCase == ServerMessage.MsgOneofCase.Error)
            {
                queued.SetException(ButtplugException.FromError(aMsg.Message.ServerMessage.Error));
            }
            else
            {
                queued.SetResult(aMsg);
            }
        }
    }
}