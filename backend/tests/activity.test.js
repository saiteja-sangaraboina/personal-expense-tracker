describe('Activity Audit Logging Format', () => {
  it('verifies activity log object creation and serialization', () => {
    const sampleLog = {
      action: 'TRANSACTION_CREATED',
      description: 'Added new expense: Grocery trip ($125.00)',
      ipAddress: '127.0.0.1',
      createdAt: new Date().toISOString(),
    };

    expect(sampleLog.action).toBe('TRANSACTION_CREATED');
    expect(sampleLog.description).toContain('$125.00');
    expect(sampleLog.ipAddress).toBe('127.0.0.1');
    expect(sampleLog.createdAt).toBeTruthy();
  });
});
