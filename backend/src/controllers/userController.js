import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import userService from "../services/userService.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import User from "../models/User.js";

const userController = Router();

userController.get("/profile", isAuth, (req, res) => {
    return res.status(200).json({ user: req.user });
});

userController.get("/profile/full", isAuth, async (req, res) => {
    try {
        const id = String(req.user.id || "");
        if (!id) return res.status(400).json({ error: "Missing user id." });

        const user = await userService.getById(id);
        if (!user) return res.status(404).json({ error: "User not found." });

        return res.status(200).json({ user });

    } catch (err) {
        console.error("GET /profile/full error:", err);
        return res.status(500).json({ error: "Failed to load full profile." });
    }
});


userController.put("/profile", isAuth, async (req, res) => {
    try {
        const updatedUser = await userService.updateProfile(req.user.id, req.body);
        res.status(200).json({
            message: "Profile updated successfully.",
            user: updatedUser,
        });
    } catch (err) {
        res.status(400).json({ error: getErrorMessage(err) });
    }
});

userController.get("/profile/eco", isAuth, async (req, res) => {
    try {
        const { ecoStats, achievements } = await userService.getEcoStats(req.user.id);
        res.status(200).json({ ecoStats, achievements });
    } catch (err) {
        console.error("GET /profile/eco error:", err);
        res.status(400).json({ error: "Failed to load eco stats." });
    }
});

userController.get("/:userId/public", async (req, res) => {
    try {
        const id = String(req.params.userId || "");
        if (!id) return res.status(400).json({ error: "Missing user id." });

        const user = await User.findById(id)
            .select("username rating phoneNumber tripsCompleted car ecoStats createdAt")
            .lean();

        if (!user) return res.status(404).json({ error: "User not found." });


        const payload = {
            id: String(user._id),
            username: user.username,
            rating: user.rating ?? 0,
            phoneNumber: user.phoneNumber ?? null,
            tripsCompleted: user.tripsCompleted ?? 0,
            car: user.car ?? null,
            ecoStats: user.ecoStats ?? { totalRides: 0, co2SavedKg: 0, moneySaved: 0 },
            createdAt: user.createdAt,
        };

        return res.status(200).json({ user: payload });
    } catch (err) {
        console.error("GET /users/:userId/public error:", err);
        return res.status(500).json({ error: "Failed to load user." });
    }
});


export default userController;
