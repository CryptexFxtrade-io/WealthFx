import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Root route for testing
app.get("/", (req, res) => res.send("FxWealth API is live!"));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// MongoDB connection with top-level await
await mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("MongoDB connected");

// Listen on Render-assigned port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
