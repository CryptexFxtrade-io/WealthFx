const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); // Auth middleware
const User = require("../models/User"); // User model
const Investment = require("../models/Investment"); // Investment model

// =======================================
// GET CURRENT USER PROFILE
// =======================================
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// =======================================
// GET USER INVESTMENTS
// =======================================
router.get("/investments", auth, async (req, res) => {
  try {
    const investments = await Investment.find({ userId: req.user.id }).populate("planId");
    res.json(investments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// =======================================
// UPDATE USER PROFILE
// =======================================
router.put("/", auth, async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password");
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// =======================================
// DELETE USER
// =======================================
router.delete("/", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
