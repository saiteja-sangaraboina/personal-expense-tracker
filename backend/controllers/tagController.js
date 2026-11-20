const Tag = require('../models/Tag');

/**
 * @desc    Get all user custom tags
 * @route   GET /api/tags
 * @access  Private
 */
const getTags = async (req, res) => {
  try {
    const tags = await Tag.find({ user: req.user.id }).sort({ usageCount: -1, name: 1 });
    res.status(200).json({ success: true, count: tags.length, data: tags });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * @desc    Create a new custom tag
 * @route   POST /api/tags
 * @access  Private
 */
const createTag = async (req, res) => {
  try {
    const { name, color } = req.body;
    const cleanName = String(name || '').trim().replace(/^#/, '');

    if (!cleanName) {
      return res.status(400).json({ success: false, message: 'Tag name cannot be empty' });
    }

    const tag = await Tag.create({
      user: req.user.id,
      name: cleanName,
      color: color || '#6366f1',
    });

    res.status(201).json({ success: true, data: tag });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: 'Tag with this name already exists' });
    }
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * @desc    Delete a custom tag
 * @route   DELETE /api/tags/:id
 * @access  Private
 */
const deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!tag) {
      return res.status(404).json({ success: false, message: 'Tag not found' });
    }
    res.status(200).json({ success: true, message: 'Tag deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getTags,
  createTag,
  deleteTag,
};
