import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  profitPercent: { type: Number, required: true },
});

const Plan = mongoose.model("Plan", PlanSchema);
export default Plan;
