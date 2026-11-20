const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');
const { monthlySummaryHtml, monthlySummaryText } = require('../utils/emailTemplates');
const { startOfMonth, startOfMonthsAgo } = require('../utils/helpers');

/**
 * @desc    Get notification summary and alerts digest
 * @route   GET /api/notifications/summary
 * @access  Private
 */
const getNotificationSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    // Fetch active budgets for this month
    const budgets = await Budget.find({
      user: userId,
      month: currentMonth,
      year: currentYear,
    });

    const alerts = [];
    for (const b of budgets) {
      const pct = b.monthlyLimit > 0 ? Math.round((b.spent / b.monthlyLimit) * 100) : 0;
      if (pct >= 100) {
        alerts.push({
          type: 'danger',
          category: b.category,
          message: `Budget for ${b.category} exceeded ($${b.spent} / $${b.monthlyLimit})`,
          percentage: pct,
        });
      } else if (pct >= (b.alertThreshold || 80)) {
        alerts.push({
          type: 'warning',
          category: b.category,
          message: `Budget for ${b.category} reached ${pct}% of limit`,
          percentage: pct,
        });
      }
    }

    // Calculate monthly totals
    const monthStart = startOfMonth();
    const transactions = await Transaction.find({
      user: userId,
      date: { $gte: monthStart },
    });

    let totalIncome = 0;
    let totalExpenses = 0;
    transactions.forEach((t) => {
      if (t.type === 'income') totalIncome += t.amount;
      else totalExpenses += t.amount;
    });

    res.status(200).json({
      success: true,
      data: {
        alertsCount: alerts.length,
        alerts,
        currentMonth: {
          income: totalIncome,
          expenses: totalExpenses,
          savings: totalIncome - totalExpenses,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * @desc    Generate email preview content for monthly summary
 * @route   GET /api/notifications/preview-email
 * @access  Private
 */
const previewMonthlyEmail = async (req, res) => {
  try {
    const user = req.user;
    const monthName = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

    const html = monthlySummaryHtml({
      name: user.name || 'Valued User',
      month: monthName,
      totalIncome: 3500,
      totalExpenses: 2150,
      netSavings: 1350,
      topCategories: [
        { category: 'Housing & Rent', amount: 1200 },
        { category: 'Food & Groceries', amount: 450 },
        { category: 'Transportation', amount: 250 },
      ],
      budgetAlerts: [
        { name: 'Food & Groceries', spent: 450, limit: 500 },
      ],
    });

    res.status(200).json({
      success: true,
      data: {
        subject: `Your ${monthName} Financial Summary`,
        html,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getNotificationSummary,
  previewMonthlyEmail,
};
