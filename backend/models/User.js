import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
  balance: { type: Number, default: 0 },
  totalInvested: { type: Number, default: 0 },
  totalProfit: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
