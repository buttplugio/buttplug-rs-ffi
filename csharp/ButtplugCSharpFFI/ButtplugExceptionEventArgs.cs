using System;

namespace ButtplugCSharpFFI
{
    public class ButtplugExceptionEventArgs : EventArgs
    {
        public ButtplugException Exception { get; }

        public ButtplugExceptionEventArgs(ButtplugException ex)
        {
            Exception = ex;
        }
    }
}
