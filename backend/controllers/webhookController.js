const Webhook = require('../models/Webhook');

// @desc    Get all user webhooks
// @route   GET /api/webhooks
// @access  Private
const getWebhooks = async (req, res, next) => {
  try {
    const webhooks = await Webhook.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: webhooks.length, data: webhooks });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new webhook endpoint
// @route   POST /api/webhooks
// @access  Private
const createWebhook = async (req, res, next) => {
  try {
    const { url, events } = req.body;
    if (!url) {
      return res.status(400).json({ success: false, message: 'Please provide a destination URL' });
    }

    const webhook = await Webhook.create({
      userId: req.user._id,
      url,
      events: events || ['BUDGET_EXCEEDED', 'BILL_DUE'],
    });

    res.status(201).json({ success: true, data: webhook });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete webhook endpoint
// @route   DELETE /api/webhooks/:id
// @access  Private
const deleteWebhook = async (req, res, next) => {
  try {
    const webhook = await Webhook.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!webhook) {
      return res.status(404).json({ success: false, message: 'Webhook not found' });
    }
    res.status(200).json({ success: true, message: 'Webhook removed successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getWebhooks,
  createWebhook,
  deleteWebhook,
};
