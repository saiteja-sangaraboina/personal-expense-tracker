/**
 * Opens a formatted printable window allowing user to save financial summary as PDF
 */
export const exportFinancialReportPdf = ({ summary, analytics, user, year = new Date().getFullYear() }) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Financial Report - ${year}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #1e293b; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 30px; }
          .title { font-size: 24px; font-weight: bold; color: #4f46e5; }
          .meta { font-size: 13px; color: #64748b; line-height: 1.6; text-align: right; }
          .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 30px; }
          .stat-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; }
          .stat-label { font-size: 12px; color: #64748b; margin-bottom: 4px; }
          .stat-value { font-size: 18px; font-weight: bold; color: #0f172a; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th { text-align: left; padding: 10px; background: #f1f5f9; font-size: 12px; color: #475569; text-transform: uppercase; }
          td { padding: 10px; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
          .text-right { text-align: right; }
          .income { color: #10b981; font-weight: 600; }
          .expense { color: #ef4444; font-weight: 600; }
          .footer { margin-top: 50px; font-size: 11px; text-align: center; color: #94a3b8; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="title">Personal Expense Tracker</div>
            <div style="font-size: 14px; margin-top: 5px; color: #64748b;">Annual Financial Statement</div>
          </div>
          <div class="meta">
            <strong>Client:</strong> ${user?.name || 'Account Holder'}<br />
            <strong>Email:</strong> ${user?.email || 'N/A'}<br />
            <strong>Period:</strong> January - December ${year}
          </div>
        </div>

        <div class="grid">
          <div class="stat-box">
            <div class="stat-label">Total Income</div>
            <div class="stat-value income">$${Number(summary?.totalIncome || 0).toLocaleString()}</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">Total Expenses</div>
            <div class="stat-value expense">$${Number(summary?.totalExpenses || 0).toLocaleString()}</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">Net Balance</div>
            <div class="stat-value">$${Number(summary?.balance || 0).toLocaleString()}</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">Monthly Savings</div>
            <div class="stat-value">$${Number(summary?.monthlySavings || 0).toLocaleString()}</div>
          </div>
        </div>

        <h3>Monthly Breakdown (${year})</h3>
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th class="text-right">Income ($)</th>
              <th class="text-right">Expenses ($)</th>
              <th class="text-right">Net Savings ($)</th>
            </tr>
          </thead>
          <tbody>
            ${(analytics?.monthlyChart || [])
              .map(
                (m) => `
              <tr>
                <td>${m.name}</td>
                <td class="text-right income">$${m.income.toLocaleString()}</td>
                <td class="text-right expense">$${m.expenses.toLocaleString()}</td>
                <td class="text-right">$${(m.income - m.expenses).toLocaleString()}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>

        <div class="footer">
          Generated on ${new Date().toLocaleDateString()} via Personal Expense Tracker application.
        </div>

        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
};
