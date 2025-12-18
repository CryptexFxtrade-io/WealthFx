import express from "express"; // if using ESM
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express(); // <-- this defines 'app'

app.use(cors());
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// import routes
import authRoutes from "./routes/auth.js";
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
