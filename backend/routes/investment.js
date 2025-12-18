const express = require("express");
const router = express.Router();
const Investment = require("../models/Investment.js");
const auth = require("../middleware/auth.js"); // if you have an auth middleware

// GET USER INVESTMENTS
router.get("/", auth, async (req, res) => {
  try {
    const investments = await Investment.find({ userId: req.user.id }).populate("planId");
    res.json(investments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// CREATE INVESTMENT
router.post("/", auth, async (req, res) => {
  try {
    const { planId, amount } = req.body;
    const investment = await Investment.create({
      userId: req.user.id,
      planId,
      amount
    });
    res.status(201).json(investment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
