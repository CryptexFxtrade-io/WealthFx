// routes/auth.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // JWT middleware
const User = require('../models/User');

// GET current user info
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // exclude password
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
