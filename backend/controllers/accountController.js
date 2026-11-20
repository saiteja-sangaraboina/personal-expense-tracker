const Account = require('../models/Account');

/**
 * @desc    Get all user accounts
 * @route   GET /api/accounts
 * @access  Private
 */
const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ user: req.user.id }).sort({ isDefault: -1, createdAt: 1 });
    const totalBalance = accounts.reduce((s, a) => s + (a.type === 'credit_card' ? -a.balance : a.balance), 0);

    res.status(200).json({
      success: true,
      count: accounts.length,
      totalBalance: Math.round(totalBalance * 100) / 100,
      data: accounts,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * @desc    Create a new financial account
 * @route   POST /api/accounts
 * @access  Private
 */
const createAccount = async (req, res) => {
  try {
    const { name, type, institution, balance, currency, color, isDefault } = req.body;

    if (isDefault) {
      // Unset previous default account
      await Account.updateMany({ user: req.user.id }, { isDefault: false });
    }

    const account = await Account.create({
      user: req.user.id,
      name,
      type,
      institution,
      balance: Number(balance) || 0,
      currency: currency || 'USD',
      color: color || '#6366f1',
      isDefault: Boolean(isDefault),
    });

    res.status(201).json({ success: true, data: account });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * @desc    Transfer funds between two accounts
 * @route   POST /api/accounts/transfer
 * @access  Private
 */
const transferFunds = async (req, res) => {
  try {
    const { fromAccountId, toAccountId, amount } = req.body;
    const transferAmount = Number(amount);

    if (!transferAmount || transferAmount <= 0) {
      return res.status(400).json({ success: false, message: 'Transfer amount must be positive' });
    }

    if (fromAccountId === toAccountId) {
      return res.status(400).json({ success: false, message: 'Cannot transfer funds to the same account' });
    }

    const fromAccount = await Account.findOne({ _id: fromAccountId, user: req.user.id });
    const toAccount = await Account.findOne({ _id: toAccountId, user: req.user.id });

    if (!fromAccount || !toAccount) {
      return res.status(404).json({ success: false, message: 'Source or destination account not found' });
    }

    fromAccount.balance -= transferAmount;
    toAccount.balance += transferAmount;

    await fromAccount.save();
    await toAccount.save();

    res.status(200).json({
      success: true,
      message: `Successfully transferred $${transferAmount.toFixed(2)} from ${fromAccount.name} to ${toAccount.name}`,
      data: { fromAccount, toAccount },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * @desc    Delete an account
 * @route   DELETE /api/accounts/:id
 * @access  Private
 */
const deleteAccount = async (req, res) => {
  try {
    const account = await Account.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }
    res.status(200).json({ success: true, message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAccounts,
  createAccount,
  transferFunds,
  deleteAccount,
};
