const mongoose = require('mongoose');

const webhookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    url: {
      type: String,
      required: [true, 'Webhook endpoint URL is required'],
      trim: true,
    },
    secret: {
      type: String,
      required: true,
      default: () => Math.random().toString(36).substring(2, 15),
    },
    events: {
      type: [String],
      enum: ['BUDGET_EXCEEDED', 'BILL_DUE', 'ANOMALY_DETECTED', 'GOAL_ACHIEVED'],
      default: ['BUDGET_EXCEEDED', 'BILL_DUE'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Webhook', webhookSchema);
