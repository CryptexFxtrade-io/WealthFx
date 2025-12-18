const Plan = require("../models/Plan");
const Investment = require("../models/Investment");

/**
 * GET ACTIVE PLANS (USER)
 */
router.get("/plans", auth, async (req, res) => {
  const plans = await Plan.find({ active: true });
  res.json(plans);
});

/**
 * INVEST IN PLAN
 */
router.post("/invest", auth, async (req, res) => {
  const { planId, amount } = req.body;

  const plan = await Plan.findById(planId);
  if (!plan || !plan.active)
    return res.status(400).json({ msg: "Invalid plan" });

  if (amount < plan.min || amount > plan.max)
    return res.status(400).json({ msg: "Amount not within plan range" });

  const user = await User.findById(req.user.id);
  if (user.balance < amount)
    return res.status(400).json({ msg: "Insufficient balance" });

  // Lock funds
  user.balance -= amount;
  await user.save();

  const endDate = new Date();
  endDate.setDate(endDate.getDate() + plan.durationDays);

  const investment = await Investment.create({
    userId: user._id,
    planId,
    amount,
    profit: 0,
    endDate
  });

  res.json({ msg: "Investment successful", investment });
});
