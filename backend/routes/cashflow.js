const express = require('express');
const router = express.Router();
const { getCashflowVelocity } = require('../controllers/cashflowController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/velocity', getCashflowVelocity);

module.exports = router;
