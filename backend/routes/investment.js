const express = require('express');
const router = express.Router();
const Investment = require('../models/Investment'); // make sure your model exists
const auth = require('../middleware/auth');

// GET USER INVESTMENTS
router.get('/', auth, async (req, res) => {
  try {
    const investments = await Investment.find({ userId: req.user.id }).populate('planId');
    res.json(investments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
