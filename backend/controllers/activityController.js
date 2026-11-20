const ActivityLog = require('../models/ActivityLog');

// @desc    Get user security & activity audit logs
// @route   GET /api/activity
// @access  Private
const getActivityLogs = async (req, res, next) => {
  try {
    const logs = await ActivityLog.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({ success: true, count: logs.length, data: logs });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear activity history
// @route   DELETE /api/activity
// @access  Private
const clearActivityLogs = async (req, res, next) => {
  try {
    await ActivityLog.deleteMany({ userId: req.user._id });
    res.status(200).json({ success: true, message: 'Activity log history cleared' });
  } catch (error) {
    next(error);
  }
};

// @desc    Export activity audit logs as CSV
// @route   GET /api/activity/export
// @access  Private
const exportActivityLogs = async (req, res, next) => {
  try {
    const logs = await ActivityLog.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(500);

    const headers = ['Action', 'Description', 'IP Address', 'Timestamp'];
    const rows = logs.map((log) => [
      `"${log.action || ''}"`,
      `"${(log.description || '').replace(/"/g, '""')}"`,
      `"${log.ipAddress || ''}"`,
      `"${log.createdAt ? new Date(log.createdAt).toISOString() : ''}"`,
    ].join(','));

    const csv = [headers.join(','), ...rows].join('\n');

    res.status(200).json({
      success: true,
      count: logs.length,
      csv,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getActivityLogs, clearActivityLogs, exportActivityLogs };
