const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Deposit = require("../models/Deposit");
const Withdrawal = require("../models/Withdrawal");

const router = express.Router();

/**
 * GET logged-in user
 */
router.get("/me", auth, async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
});

/**
 * CREATE DEPOSIT (PENDING)
 */
router.post("/deposit", auth, async (req, res) => {
    const { amount, currency, txHash } = req.body;

              const deposit = await Deposit.create({
       userId: req.user.id,
    amount,
    currency,
    txHash
   );
 
 res.json({ msg: "Deposit submitted, awaiting approval", deposit });
});
/
**
 * CREATE WITHDRAWAL REQUEST
 */
router.post("/withdraw", auth, async (req, res) => {
  const { amount, walletAddress } = req.body;
 
 const user = await User.findById(req.user.id);
  if (user.balance < amount)
    return res.status(400).json({ msg: "Insufficient balance" });
 
 const withdrawal = await Withdrawal.create({
    userId: req.user.id,
    amount,
    walletAddress
 } );
 
 res.json({ msg: "Withdrawal request submitted", withdrawal });
});
m
odule.exports = router;
}      
