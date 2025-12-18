import mongoose from "mongoose";

const InvestmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "InvestmentPlan" },
  amount: Number,
  profit: Number,
  startDate: Date,
  endDate: Date,
  status: { type: String, default: "active" }
}, { timestamps: true });

export default mongoose.model("Investment", InvestmentSchema);
