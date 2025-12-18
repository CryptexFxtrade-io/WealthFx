import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: String, // deposit, withdrawal, profit
  amount: Number,
  status: { type: String, default: "pending" }
}, { timestamps: true });

export default mongoose.model("Transaction", TransactionSchema);
