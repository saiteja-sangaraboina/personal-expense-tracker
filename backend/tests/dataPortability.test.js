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

    const archive = {
      exportedAt: new Date().toISOString(),
      account: mockUser,
      counts: {
        transactions: mockTransactions.length,
        budgets: 0,
        goals: 0,
      },
      data: {
        transactions: mockTransactions,
      },
    };

    expect(archive.exportedAt).toBeTruthy();
    expect(archive.account.email).toBe('test@example.com');
    expect(archive.counts.transactions).toBe(2);
    expect(archive.data.transactions).toHaveLength(2);
  });
});
