const express = require('express');
const router = express.Router();
const {
  getAccounts,
  createAccount,
  transferFunds,
  deleteAccount,
} = require('../controllers/accountController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getAccounts)
  .post(createAccount);

router.post('/transfer', transferFunds);

router.route('/:id')
  .delete(deleteAccount);

module.exports = router;
