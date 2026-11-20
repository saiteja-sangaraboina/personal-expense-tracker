const RecurringTransaction = require('../models/RecurringTransaction');

// @desc    Get recurring subscriptions and bills
// @route   GET /api/recurring
// @access  Private
const getRecurring = async (req, res, next) => {
  try {
    const list = await RecurringTransaction.find({ userId: req.user._id }).sort({ nextDueDate: 1 });
    res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error) {
    next(error);
  }
};

// @desc    Add recurring subscription
// @route   POST /api/recurring
// @access  Private
const createRecurring = async (req, res, next) => {
  try {
    const item = await RecurringTransaction.create({
      userId: req.user._id,
      ...req.body,
    });
    res.status(201).json({ success: true, message: 'Recurring transaction saved', data: item });
  } catch (error) {
    next(error);
  }
};

// @desc    Update recurring subscription
// @route   PUT /api/recurring/:id
// @access  Private
const updateRecurring = async (req, res, next) => {
  try {
    const item = await RecurringTransaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ success: false, message: 'Recurring item not found' });
    res.status(200).json({ success: true, message: 'Updated successfully', data: item });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete recurring subscription
// @route   DELETE /api/recurring/:id
// @access  Private
const deleteRecurring = async (req, res, next) => {
  try {
    const item = await RecurringTransaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getRecurring, createRecurring, updateRecurring, deleteRecurring };
