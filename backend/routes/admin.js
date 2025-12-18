const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const User = require("../models/User");
const Deposit = require("../models/Deposit");
const Withdrawal = require("../models/Withdrawal");

const router = express.Router();

/**
 * GET ALL USERS
 */
router.get("/users", auth, admin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

/**
 * APPROVE DEPOSIT (REAL MONEY CREDIT)
 */
router.post("/approve-deposit", auth, admin, async (req, res) => {
  const { depositId } = req.body;

  const deposit = await Deposit.findById(depositId);
  if (!deposit || deposit.status === "approved")
    return res.status(400).json({ msg: "Invalid deposit" });

  const user = await User.findById(deposit.userId);

  user.balance += deposit.amount;
  deposit.status = "approved";

  await user.save();
  await deposit.save();

  res.json({ msg: "Deposit approved & balance credited" });
});

/**
 * APPROVE WITHDRAWAL
 */
router.post("/approve-withdrawal", auth, admin, async (req, res) => {
  const { withdrawalId } = req.body;

  const withdrawal = await Withdrawal.findById(withdrawalId);
  if (!withdrawal || withdrawal.status !== "pending")
    return res.status(400).json({ msg: "Invalid withdrawal" });

  const user = await User.findById(withdrawal.userId);

  if (user.balance < withdrawal.amount)
    return res.status(400).json({ msg: "User balance insufficient" });

  user.balance -= withdrawal.amount;
  withdrawal.status = "approved";

  await user.save();
  await withdrawal.save();

  res.json({ msg: "Withdrawal approved" });
});

/**
 * MANUAL CREDIT (ADMIN POWER)
 */
router.post("/credit-user", auth, admin, async (req, res) => {
  const { userId, amount } = req.body;

  const user = await User.findById(userId);
  user.balance += amount;
  await user.save();

  res.json({ msg: "User credited successfully" });
});

module.exports = router;
