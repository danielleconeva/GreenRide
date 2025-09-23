import { Router } from "express";
import userService from "../services/userService.js";
import { AUTH_COOKIE_NAME } from "../config/index.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const authController = Router();

authController.post("/register", isGuest, async (req, res) => {
    const userData = req.body;

    try {
        const token = await userService.register(userData);
        res
            .cookie(AUTH_COOKIE_NAME, token, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production"
            })
            .status(201)
            .json({ message: "Registration successful.", token });
    } catch (err) {
        res.status(400).json({ error: getErrorMessage(err) });
    }
});

authController.post("/login", isGuest, async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userService.login(email, password);
        res
            .cookie(AUTH_COOKIE_NAME, token, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production"
            })
            .status(200)
            .json({ message: "Login successful.", token });
    } catch (err) {
        res.status(401).json({ error: getErrorMessage(err) });
    }
});

authController.post("/logout", isAuth, (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.status(200).json({ message: "Logged out successfully." });
});

export default authController;
