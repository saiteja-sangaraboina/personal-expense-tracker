import { describe, it, expect } from 'vitest';
import { generateExcelWorkbook } from '../excelExport';

describe('excelExport utility', () => {
  const sampleTransactions = [
    { date: '2024-06-01', type: 'income', category: 'Salary', amount: 4500, description: 'Tech Corp' },
    { date: '2024-06-03', type: 'expense', category: 'Groceries', amount: 120.5, description: 'Supermarket' },
  ];

  it('generates valid XML Excel workbook schema', () => {
    const xml = generateExcelWorkbook(sampleTransactions, 'Monthly Expenses');
    expect(xml).toContain('<?xml version="1.0"?>');
    expect(xml).toContain('<Worksheet ss:Name="Monthly Expenses">');
    expect(xml).toContain('<Cell><Data ss:Type="String">Date</Data></Cell>');
    expect(xml).toContain('Salary');
    expect(xml).toContain('4500.00');
    expect(xml).toContain('Groceries');
    expect(xml).toContain('120.50');
  });

  it('handles empty transaction arrays safely', () => {
    const xml = generateExcelWorkbook([]);
    expect(xml).toContain('<Worksheet ss:Name="Transactions">');
    expect(xml).toContain('</Workbook>');
  });
});
