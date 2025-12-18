import mongoose from "mongoose";

const InvestmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Investment = mongoose.model("Investment", InvestmentSchema);
export default Investment; // ✅ make it default export
