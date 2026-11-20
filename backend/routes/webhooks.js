const express = require('express');
const router = express.Router();
const { getWebhooks, createWebhook, deleteWebhook } = require('../controllers/webhookController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/').get(getWebhooks).post(createWebhook);
router.route('/:id').delete(deleteWebhook);

module.exports = router;
