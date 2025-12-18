/**
 * GET USER INVESTMENTS
 */
router.get("/investments", auth, async (req, res) => {
  const investments = await Investment.find({ userId: req.user.id })
    .populate("planId");
  res.json(investments);
});
