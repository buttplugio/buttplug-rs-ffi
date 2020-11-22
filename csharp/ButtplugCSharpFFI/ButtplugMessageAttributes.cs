using System;
using System.Collections.Generic;
using System.Text;

namespace Buttplug
{
    public class ButtplugMessageAttributes
    {
        public readonly uint FeatureCount;
        public readonly uint[] StepCount;
        public readonly Endpoint[] Endpoints;
        public readonly uint[] MaxDuration;
        public readonly string[][] Patterns;
        public readonly string[] ActuatorType;

        public ButtplugMessageAttributes(uint aFeatureCount, uint[] aStepCount, Endpoint[] aEndpoints, uint[] aMaxDuration, string[][] aPatterns, string[] aActuatorType) 
        {
            FeatureCount = aFeatureCount;
            StepCount = aStepCount;
            Endpoints = aEndpoints;
            MaxDuration = aMaxDuration;
            Patterns = aPatterns;
            ActuatorType = aActuatorType;
        }
    }
}
