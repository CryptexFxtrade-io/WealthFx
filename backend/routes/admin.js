/**
 * CREDIT ROI & COMPLETE INVESTMENT
 */
router.post("/credit-roi", auth, admin, async (req, res) => {
  const { investmentId } = req.body;

  const investment = await Investment.findById(investmentId);
  if (!investment || investment.status !== "active")
    return res.status(400).json({ msg: "Invalid investment" });

  const plan = await Plan.findById(investment.planId);
  const user = await User.findById(investment.userId);

  const profit = (investment.amount * plan.roiPercent) / 100;

  investment.profit = profit;
  investment.status = "completed";

  user.balance += investment.amount + profit;

  await investment.save();
  await user.save();

  res.json({
    msg: "ROI credited & investment completed",
    profit
  });
});
