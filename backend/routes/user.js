const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); // Make sure auth middleware exists
const Investment = require("../models/Investment"); // Make sure Investment model exists

/**
 * GET USER INVESTMENTS
 */
router.get("/investments", auth, async (req, res) => {
  try {
    const investments = await Investment.find({ userId: req.user.id }).populate("planId");
    res.json(investments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
