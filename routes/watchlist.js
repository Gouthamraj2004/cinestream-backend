const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get current user watchlist
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('watchlist');
    res.json(user.watchlist);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add movie to watchlist
router.post('/:movieId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.watchlist.includes(req.params.movieId)) {
      user.watchlist.push(req.params.movieId);
      await user.save();
    }
    res.json({ message: 'Added to watchlist' });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove movie from watchlist
router.delete('/:movieId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.watchlist = user.watchlist.filter(id => id.toString() !== req.params.movieId);
    await user.save();
    res.json({ message: 'Removed from watchlist' });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;