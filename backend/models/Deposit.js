const mongoose = require("mongoose");

const DepositSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  currency: String,
  txHash: String,
  status: { type: String, default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Deposit", DepositSchema);
