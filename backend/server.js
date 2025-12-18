import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
