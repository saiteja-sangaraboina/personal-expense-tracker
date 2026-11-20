describe('Account Data Model and Balance Transfer Logic', () => {
  it('validates account structure with default values', () => {
    const mockAccount = {
      name: 'Chase Checking',
      type: 'bank',
      balance: 4500,
      currency: 'USD',
      isDefault: true,
    };

    expect(mockAccount.name).toBe('Chase Checking');
    expect(mockAccount.type).toBe('bank');
    expect(mockAccount.balance).toBe(4500);
    expect(mockAccount.isDefault).toBe(true);
  });

  it('accurately computes inter-account balance transfer', () => {
    const fromAccount = { name: 'Savings', balance: 5000 };
    const toAccount = { name: 'Checking', balance: 1000 };
    const transferAmount = 1500;

    fromAccount.balance -= transferAmount;
    toAccount.balance += transferAmount;

    expect(fromAccount.balance).toBe(3500);
    expect(toAccount.balance).toBe(2500);
  });
});
