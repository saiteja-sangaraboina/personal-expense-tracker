const Transaction = require('../models/Transaction');
const { startOfMonthsAgo } = require('../utils/helpers');

/**
 * @desc    Get 6-month historical cashflow velocity and average burn rate
 * @route   GET /api/cashflow/velocity
 * @access  Private
 */
const getCashflowVelocity = async (req, res) => {
  try {
    const userId = req.user.id;
    const sixMonthsAgo = startOfMonthsAgo(6);

    const transactions = await Transaction.find({
      user: userId,
      date: { $gte: sixMonthsAgo },
    }).sort({ date: 1 });

    const monthlyMap = {};

    transactions.forEach((t) => {
      const d = new Date(t.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (!monthlyMap[key]) {
        monthlyMap[key] = { month: key, income: 0, expenses: 0, netCashflow: 0 };
      }
      if (t.type === 'income') {
        monthlyMap[key].income += t.amount;
      } else {
        monthlyMap[key].expenses += t.amount;
      }
      monthlyMap[key].netCashflow = monthlyMap[key].income - monthlyMap[key].expenses;
    });

    const timeline = Object.values(monthlyMap);
    const totalExpenses = timeline.reduce((s, m) => s + m.expenses, 0);
    const averageBurnRate = timeline.length > 0 ? Math.round(totalExpenses / timeline.length) : 0;

    res.status(200).json({
      success: true,
      data: {
        timeline,
        metrics: {
          periodMonths: 6,
          averageBurnRate,
          totalDataPoints: timeline.length,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getCashflowVelocity,
};
