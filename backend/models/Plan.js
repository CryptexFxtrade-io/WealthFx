import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true }, // in days
  profitPercent: { type: Number, required: true },
});

const Plan = mongoose.model("Plan", PlanSchema);
export default Plan; // ✅ Default export
