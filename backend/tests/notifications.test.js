const { monthlySummaryHtml, monthlySummaryText } = require('../utils/emailTemplates');

describe('Notification & Email Template Generator', () => {
  const mockData = {
    name: 'Alex Johnson',
    month: 'November 2024',
    totalIncome: 5000,
    totalExpenses: 3200,
    netSavings: 1800,
    topCategories: [
      { category: 'Food', amount: 800 },
      { category: 'Utilities', amount: 350 },
    ],
    budgetAlerts: [
      { name: 'Food', spent: 800, limit: 750 },
    ],
  };

  it('generates valid HTML email summary containing key user figures', () => {
    const html = monthlySummaryHtml(mockData);
    expect(html).toContain('Alex Johnson');
    expect(html).toContain('November 2024');
    expect(html).toContain('$5,000.00');
    expect(html).toContain('$3,200.00');
    expect(html).toContain('$1,800.00');
    expect(html).toContain('Food');
    expect(html).toContain('<!DOCTYPE html>');
  });

  it('generates fallback plain text summary', () => {
    const text = monthlySummaryText(mockData);
    expect(text).toContain('Hi Alex Johnson');
    expect(text).toContain('November 2024');
    expect(text).toContain('Income:    $5,000.00');
    expect(text).toContain('Savings:   $1,800.00');
  });
});
