const { getSystemTelemetry } = require('../utils/systemTelemetry');

describe('systemTelemetry utility', () => {
  it('returns valid memory and process telemetry metrics', () => {
    const stats = getSystemTelemetry();

    expect(stats.uptimeSeconds).toBeGreaterThanOrEqual(0);
    expect(stats.nodeVersion).toBeTruthy();
    expect(stats.cpuCount).toBeGreaterThan(0);
    expect(stats.totalMemoryMb).toBeGreaterThan(0);
    expect(stats.processMemory.heapUsedMb).toBeGreaterThan(0);
    expect(stats.timestamp).toBeTruthy();
  });
});
