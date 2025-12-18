import express from "express";
import auth from "../middleware/auth.js";
import Investment from "../models/Investment.js";
import InvestmentPlan from "../models/InvestmentPlan.js";
import User from "../models/User.js";

const router = express.Router();

/**
 * CREATE INVESTMENT
 */
router.post("/", auth, async (req, res) => {
  const { planId, amount } = req.body;

  const plan = await InvestmentPlan.findById(planId);
  if (!plan) return res.status(404).json({ msg: "Plan not found" });

  if (amount < plan.minAmount || amount > plan.maxAmount) {
    return res.status(400).json({ msg: "Invalid investment amount" });
  }

  const user = await User.findById(req.user.id);
  if (user.balance < amount) {
    return res.status(400).json({ msg: "Insufficient balance" });
  }

  const profit = (amount * plan.roiPercent) / 100;

  const investment = await Investment.create({
    userId: user._id,
    planId: plan._id,
    amount,
    profit,
    startDate: new Date(),
    endDate: new Date(Date.now() + plan.durationDays * 86400000)
  });

  user.balance -= amount;
  user.totalInvested += amount;
  await user.save();

  res.json(investment);
});

/**
 * GET USER INVESTMENTS
 */
router.get("/", auth, async (req, res) => {
  const investments = await Investment.find({ userId: req.user.id })
    .populate("planId");
  res.json(investments);
});

export default router;
