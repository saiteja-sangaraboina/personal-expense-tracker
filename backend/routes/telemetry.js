const express = require('express');
const router = express.Router();
const { getSystemTelemetry } = require('../utils/systemTelemetry');
const { protect } = require('../middleware/auth');

// @desc    Get runtime telemetry stats
// @route   GET /api/telemetry/stats
// @access  Private
router.get('/stats', protect, (req, res) => {
  const telemetry = getSystemTelemetry();
  res.status(200).json({
    success: true,
    data: telemetry,
  });
});

module.exports = router;
