const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/credit", async (req, res) => {
  const { userId, amount } = req.body;
  const user = await User.findById(userId);
  user.balance += amount;
  await user.save();
  res.json({ message: "User credited successfully" });
});

module.exports = router;
