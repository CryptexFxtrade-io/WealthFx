const mongoose = require("mongoose");

const InvestmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
  amount: Number,
  profit: Number,
  status: { type: String, default: "active" },
  endDate: Date
}, { timestamps: true });

module.exports = mongoose.model("Investment", InvestmentSchema);
