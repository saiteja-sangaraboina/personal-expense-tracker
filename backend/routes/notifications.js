const express = require('express');
const router = express.Router();
const {
  getNotificationSummary,
  previewMonthlyEmail,
} = require('../controllers/notificationController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/summary', getNotificationSummary);
router.get('/preview-email', previewMonthlyEmail);

module.exports = router;
