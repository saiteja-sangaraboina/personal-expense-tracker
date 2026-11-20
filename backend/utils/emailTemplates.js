/**
 * emailTemplates.js
 * HTML email template builder for monthly financial summaries.
 */

/**
 * Generate a monthly summary email HTML.
 * @param {Object} opts
 * @param {string} opts.name           - User's name
 * @param {string} opts.month          - e.g. "October 2024"
 * @param {number} opts.totalIncome    - Total income this month
 * @param {number} opts.totalExpenses  - Total expenses this month
 * @param {number} opts.netSavings     - Net savings (income - expenses)
 * @param {Array}  opts.topCategories  - [{ category, amount }]
 * @param {Array}  opts.budgetAlerts   - [{ name, spent, limit }]
 * @returns {string} HTML string
 */
function monthlySummaryHtml({ name, month, totalIncome, totalExpenses, netSavings, topCategories = [], budgetAlerts = [] }) {
  const fmt = (n) => `$${Number(n).toFixed(2)}`;
  const savingsColor = netSavings >= 0 ? '#10b981' : '#ef4444';

  const categoryRows = topCategories
    .slice(0, 5)
    .map(c => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;">${c.category}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;text-align:right;font-weight:600;">${fmt(c.amount)}</td>
      </tr>
    `).join('');

  const alertRows = budgetAlerts
    .map(b => {
      const pct = Math.round((b.spent / b.limit) * 100);
      const color = pct >= 100 ? '#ef4444' : pct >= 80 ? '#f59e0b' : '#10b981';
      return `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;">${b.name}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;text-align:right;">${fmt(b.spent)} / ${fmt(b.limit)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;text-align:right;color:${color};font-weight:600;">${pct}%</td>
        </tr>
      `;
    }).join('');

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background:#f4f4f5;color:#1f2937;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:32px 16px;">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:32px;text-align:center;">
          <h1 style="margin:0;color:#fff;font-size:24px;">💰 Monthly Summary</h1>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:16px;">${month}</p>
        </td></tr>

        <!-- Greeting -->
        <tr><td style="padding:28px 32px 0;">
          <p style="margin:0;font-size:16px;">Hi <strong>${name}</strong>,</p>
          <p style="margin:8px 0 0;color:#6b7280;">Here's your financial summary for ${month}.</p>
        </td></tr>

        <!-- Stats -->
        <tr><td style="padding:24px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="background:#f0fdf4;border-radius:8px;padding:16px;text-align:center;width:33%;">
                <div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;">Income</div>
                <div style="font-size:22px;font-weight:700;color:#10b981;margin-top:4px;">${fmt(totalIncome)}</div>
              </td>
              <td width="12"></td>
              <td style="background:#fef2f2;border-radius:8px;padding:16px;text-align:center;width:33%;">
                <div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;">Expenses</div>
                <div style="font-size:22px;font-weight:700;color:#ef4444;margin-top:4px;">${fmt(totalExpenses)}</div>
              </td>
              <td width="12"></td>
              <td style="background:#eff6ff;border-radius:8px;padding:16px;text-align:center;width:33%;">
                <div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;">Savings</div>
                <div style="font-size:22px;font-weight:700;color:${savingsColor};margin-top:4px;">${fmt(netSavings)}</div>
              </td>
            </tr>
          </table>
        </td></tr>

        ${categoryRows ? `
        <!-- Top Categories -->
        <tr><td style="padding:0 32px 24px;">
          <h3 style="margin:0 0 12px;font-size:16px;color:#374151;">Top Spending Categories</h3>
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f0f0f0;border-radius:8px;overflow:hidden;">
            ${categoryRows}
          </table>
        </td></tr>` : ''}

        ${alertRows ? `
        <!-- Budget Alerts -->
        <tr><td style="padding:0 32px 24px;">
          <h3 style="margin:0 0 12px;font-size:16px;color:#374151;">Budget Status</h3>
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f0f0f0;border-radius:8px;overflow:hidden;">
            <tr style="background:#f9fafb;">
              <th style="padding:8px 12px;text-align:left;font-size:12px;color:#6b7280;font-weight:600;">BUDGET</th>
              <th style="padding:8px 12px;text-align:right;font-size:12px;color:#6b7280;font-weight:600;">SPENT / LIMIT</th>
              <th style="padding:8px 12px;text-align:right;font-size:12px;color:#6b7280;font-weight:600;">USAGE</th>
            </tr>
            ${alertRows}
          </table>
        </td></tr>` : ''}

        <!-- Footer -->
        <tr><td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #f0f0f0;">
          <p style="margin:0;font-size:12px;color:#9ca3af;">This is an automated summary from your Personal Expense Tracker.</p>
          <p style="margin:4px 0 0;font-size:12px;color:#9ca3af;">© 2024 Expense Tracker. All rights reserved.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/**
 * Generate a plain-text version of the monthly summary.
 */
function monthlySummaryText({ name, month, totalIncome, totalExpenses, netSavings }) {
  const fmt = (n) => `$${Number(n).toFixed(2)}`;
  return `
Hi ${name},

Here is your financial summary for ${month}:

Income:    ${fmt(totalIncome)}
Expenses:  ${fmt(totalExpenses)}
Savings:   ${fmt(netSavings)}

Stay on top of your finances — log in to your Expense Tracker for details.

© 2024 Expense Tracker
  `.trim();
}

module.exports = { monthlySummaryHtml, monthlySummaryText };
