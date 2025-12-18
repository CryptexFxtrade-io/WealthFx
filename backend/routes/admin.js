import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

/**
 * PATCH /api/admin/user/:id
 * Update a user's role or balance (admin only)
 */
router.patch("/user/:id", auth, async (req, res) => {
  try {
    // Check if requester is admin
    const admin = await User.findById(req.user.id);
    if (admin.role !== "admin") return res.status(403).json({ msg: "Access denied" });

    const { role, balance } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (role) user.role = role;
    if (balance !== undefined) user.balance = balance;

    await user.save();
    res.json({ msg: "User updated", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
