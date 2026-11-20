const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Account name is required'],
      trim: true,
      maxlength: [50, 'Account name cannot exceed 50 characters'],
    },
    type: {
      type: String,
      required: [true, 'Account type is required'],
      enum: ['bank', 'cash', 'credit_card', 'investment', 'savings', 'crypto'],
      default: 'bank',
    },
    institution: {
      type: String,
      trim: true,
      default: '',
    },
    balance: {
      type: Number,
      required: [true, 'Balance is required'],
      default: 0,
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
      maxlength: 3,
    },
    color: {
      type: String,
      default: '#6366f1',
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

accountSchema.index({ user: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Account', accountSchema);
