const mongoose = require("mongoose");

const WithdrawalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  walletAddress: String,
  status: { type: String, default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Withdrawal", WithdrawalSchema);
