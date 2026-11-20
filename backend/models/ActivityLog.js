const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        'AUTH_LOGIN',
        'AUTH_REGISTER',
        'TRANSACTION_CREATED',
        'TRANSACTION_UPDATED',
        'TRANSACTION_DELETED',
        'BUDGET_UPDATED',
        'GOAL_CREATED',
        'CSV_IMPORTED',
        'DATA_ARCHIVED',
      ],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    ipAddress: {
      type: String,
      default: '',
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

activityLogSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('ActivityLog', activityLogSchema);
