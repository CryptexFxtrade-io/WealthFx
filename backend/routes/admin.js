const Plan = require("../models/Plan");
const Investment = require("../models/Investment");

/**
 * CREATE INVESTMENT PLAN
 */
router.post("/create-plan", auth, admin, async (req, res) => {
  const { name, min, max, roiPercent, durationDays } = req.body;

  const plan = await Plan.create({
    name,
    min,
    max,
    roiPercent,
    durationDays
  });

  res.json({ msg: "Investment plan created", plan });
});

/**
 * GET ALL PLANS
 */
router.get("/plans", auth, admin, async (req, res) => {
  const plans = await Plan.find();
  res.json(plans);
});
