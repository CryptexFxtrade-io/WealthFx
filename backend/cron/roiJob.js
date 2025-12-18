const cron = require("node-cron");
const Investment = require("../models/Investment");
const User = require("../models/User");
const Plan = require("../models/Plan");

/**
 * Runs every day at 12:00 AM
 */
cron.schedule("0 0 * * *", async () => {
  console.log("⏰ Running ROI cron job");

  const now = new Date();

  const investments = await Investment.find({
    status: "active",
    endDate: { $lte: now }
  });

  for (let inv of investments) {
    const plan = await Plan.findById(inv.planId);
    const user = await User.findById(inv.userId);

    if (!plan || !user) continue;

    const profit = (inv.amount * plan.roiPercent) / 100;

    inv.profit = profit;
    inv.status = "completed";

    user.balance += inv.amount + profit;

    await inv.save();
    await user.save();

    console.log(`✅ ROI credited for user ${user.email}`);
  }
});
