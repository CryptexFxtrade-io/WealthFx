const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  name: String,
  min: Number,
  max: Number,
  roiPercent: Number,
  durationDays: Number,
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model("Plan", PlanSchema);
