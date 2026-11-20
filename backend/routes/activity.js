const express = require('express');
const router = express.Router();
const { getActivityLogs, clearActivityLogs, exportActivityLogs } = require('../controllers/activityController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/export', exportActivityLogs);
router.route('/').get(getActivityLogs).delete(clearActivityLogs);

module.exports = router;
