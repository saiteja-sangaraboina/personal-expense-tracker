const express = require('express');
const router = express.Router();
const {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  exportTransactions,
} = require('../controllers/transactionController');
const { protect } = require('../middleware/auth');
const { validateTransaction } = require('../middleware/validator');

router.use(protect); // All transaction routes are protected

router.get('/export', exportTransactions);
router.route('/').get(getTransactions).post(validateTransaction, createTransaction);
router.route('/:id').get(getTransaction).put(validateTransaction, updateTransaction).delete(deleteTransaction);

module.exports = router;
