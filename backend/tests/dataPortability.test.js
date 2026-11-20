describe('Data Portability & Archive Formatting', () => {
  it('correctly constructs a standardized backup archive structure', () => {
    const mockUser = {
      name: 'Test User',
      email: 'test@example.com',
      currency: 'USD',
      theme: 'light',
    };

    const mockTransactions = [
      { type: 'income', amount: 3000, category: 'Salary' },
      { type: 'expense', amount: 80, category: 'Food' },
    ];

    const mockAccounts = [
      { name: 'Checking Account', type: 'checking', balance: 5000 },
    ];

    const mockTags = [
      { name: 'tax-deductible', color: '#10b981' },
    ];

    const archive = {
      exportedAt: new Date().toISOString(),
      account: mockUser,
      counts: {
        transactions: mockTransactions.length,
        budgets: 0,
        goals: 0,
        accounts: mockAccounts.length,
        tags: mockTags.length,
      },
      data: {
        transactions: mockTransactions,
        accounts: mockAccounts,
        tags: mockTags,
      },
    };

    expect(archive.exportedAt).toBeTruthy();
    expect(archive.account.email).toBe('test@example.com');
    expect(archive.counts.transactions).toBe(2);
    expect(archive.counts.accounts).toBe(1);
    expect(archive.counts.tags).toBe(1);
    expect(archive.data.transactions).toHaveLength(2);
    expect(archive.data.accounts).toHaveLength(1);
  });
});
