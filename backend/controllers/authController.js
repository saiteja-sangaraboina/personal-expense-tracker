const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');
const Goal = require('../models/Goal');
const Recurring = require('../models/RecurringTransaction');
const Category = require('../models/Category');
const { sendTokenResponse } = require('../utils/tokenUtils');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists',
      });
    }

    // Create user
    const user = await User.create({ name, email, password });

    sendTokenResponse(user, 201, res, 'Account created successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    sendTokenResponse(user, 200, res, 'Logged in successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const { name, currency, theme } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, currency, theme },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update password
// @route   PUT /api/auth/password
// @access  Private
const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select('+password');

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    user.password = newPassword;
    await user.save();

    sendTokenResponse(user, 200, res, 'Password updated successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Export all user financial records (Data Portability)
// @route   GET /api/auth/export-data
// @access  Private
const exportUserData = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [user, transactions, budgets, goals, recurring, categories] = await Promise.all([
      User.findById(userId),
      Transaction.find({ userId }),
      Budget.find({ userId }),
      Goal.find({ userId }),
      Recurring.find({ userId }),
      Category.find({ userId }),
    ]);

    const archive = {
      exportedAt: new Date().toISOString(),
      account: {
        name: user.name,
        email: user.email,
        currency: user.currency,
        theme: user.theme,
        createdAt: user.createdAt,
      },
      counts: {
        transactions: transactions.length,
        budgets: budgets.length,
        goals: goals.length,
        recurring: recurring.length,
        categories: categories.length,
      },
      data: {
        transactions,
        budgets,
        goals,
        recurring,
        categories,
      },
    };

    res.status(200).json({ success: true, archive });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user account and cascade delete all personal records
// @route   DELETE /api/auth/delete-account
// @access  Private
const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.user._id;

    await Promise.all([
      Transaction.deleteMany({ userId }),
      Budget.deleteMany({ userId }),
      Goal.deleteMany({ userId }),
      Recurring.deleteMany({ userId }),
      Category.deleteMany({ userId }),
      User.findByIdAndDelete(userId),
    ]);

    res.status(200).json({
      success: true,
      message: 'Your account and all associated financial records have been permanently removed.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe, updateProfile, updatePassword, exportUserData, deleteAccount };
