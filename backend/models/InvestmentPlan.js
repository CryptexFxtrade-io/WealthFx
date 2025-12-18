import mongoose from "mongoose";

const InvestmentPlanSchema = new mongoose.Schema({
  name: String,
  minAmount: Number,
  maxAmount: Number,
  roiPercent: Number,
  durationDays: Number
}, { timestamps: true });

export default mongoose.model("InvestmentPlan", InvestmentPlanSchema);
