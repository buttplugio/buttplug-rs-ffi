namespace Buttplug
{
    public class ButtplugMessageAttributes
    {
        public uint FeatureCount { get; }
        public uint[] StepCount { get; }
        public Endpoint[] Endpoints { get; }
        public uint[] MaxDuration { get; }

        public ButtplugMessageAttributes(uint aFeatureCount, uint[] aStepCount, Endpoint[] aEndpoints, uint[] aMaxDuration, string[][] aPatterns, string[] aActuatorType)
        {
            FeatureCount = aFeatureCount;
            StepCount = aStepCount;
            Endpoints = aEndpoints;
            MaxDuration = aMaxDuration;
        }
    }
}
