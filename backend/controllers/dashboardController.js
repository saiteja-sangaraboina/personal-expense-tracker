const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');

// @desc    Get dashboard summary
// @route   GET /api/dashboard/summary
// @access  Private
const getDashboardSummary = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // All-time totals
    const allTimeResult = await Transaction.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
        },
      },
    ]);

    // This month totals
    const monthlyResult = await Transaction.aggregate([
      { $match: { userId, date: { $gte: startOfMonth, $lte: endOfMonth } } },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
        },
      },
    ]);

    // Recent 5 transactions
    const recentTransactions = await Transaction.find({ userId })
      .sort({ date: -1 })
      .limit(5);

    const totalIncome = allTimeResult.find((r) => r._id === 'income')?.total || 0;
    const totalExpenses = allTimeResult.find((r) => r._id === 'expense')?.total || 0;
    const monthlyIncome = monthlyResult.find((r) => r._id === 'income')?.total || 0;
    const monthlyExpenses = monthlyResult.find((r) => r._id === 'expense')?.total || 0;

    res.status(200).json({
      success: true,
      data: {
        totalIncome,
        totalExpenses,
        balance: totalIncome - totalExpenses,
        monthlySavings: monthlyIncome - monthlyExpenses,
        monthlyIncome,
        monthlyExpenses,
        recentTransactions,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get analytics data
// @route   GET /api/dashboard/analytics
// @access  Private
const getAnalytics = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const now = new Date();
    const year = Number(req.query.year) || now.getFullYear();

    // Monthly income vs expense for the year
    const monthlyData = await Transaction.aggregate([
      {
        $match: {
          userId,
          date: {
            $gte: new Date(year, 0, 1),
            $lte: new Date(year, 11, 31),
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: '$date' },
            type: '$type',
          },
          total: { $sum: '$amount' },
        },
      },
      { $sort: { '_id.month': 1 } },
    ]);

    // Category-wise expenses (current month)
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const categoryData = await Transaction.aggregate([
      {
        $match: {
          userId,
          type: 'expense',
          date: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
        },
      },
      { $sort: { total: -1 } },
    ]);

    // Format monthly data into chart-friendly format
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const chartData = months.map((name, i) => {
      const month = i + 1;
      const incomeEntry = monthlyData.find(
        (d) => d._id.month === month && d._id.type === 'income'
      );
      const expenseEntry = monthlyData.find(
        (d) => d._id.month === month && d._id.type === 'expense'
      );
      return {
        name,
        income: incomeEntry?.total || 0,
        expenses: expenseEntry?.total || 0,
      };
    });

    res.status(200).json({
      success: true,
      data: {
        monthlyChart: chartData,
        categoryChart: categoryData.map((c) => ({
          name: c._id,
          value: c.total,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardSummary, getAnalytics };
