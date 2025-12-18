// Load dependencies
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/auth.js");
const investmentRoutes = require("./routes/investments.js"); // remove if no investment route yet

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/investments", investmentRoutes); // remove if no investment route yet

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));
