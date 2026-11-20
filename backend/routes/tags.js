const express = require('express');
const router = express.Router();
const { getTags, createTag, deleteTag } = require('../controllers/tagController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getTags)
  .post(createTag);

router.route('/:id')
  .delete(deleteTag);

module.exports = router;
