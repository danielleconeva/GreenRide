import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import userService from "../services/userService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const userController = Router();

userController.get("/profile", isAuth, async (req, res) => {
    try {
        const user = await userService.getById(req.user.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ error: "User not found." });
    }
});

userController.put("/profile", isAuth, async (req, res) => {
    try {
        const updatedUser = await userService.updateProfile(req.user.id, req.body);
        res.status(200).json({
            message: "Profile updated successfully.",
            user: updatedUser
        });
    } catch (err) {
        res.status(400).json({ error: getErrorMessage(err) });
    }
});

userController.get("/profile/eco", isAuth, async (req, res) => {
    try {
        const ecoStats = await userService.getEcoStats(req.user.id);
        res.status(200).json(ecoStats);
    } catch (err) {
        res.status(400).json({ error: "Failed to load eco stats." });
    }
});

export default userController;
