import { Router } from "express";
import userService from "../services/userService.js";
import { AUTH_COOKIE_NAME } from "../config/index.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { cookieOptions } from "../config/cookieOptions.js";

const authController = Router();

authController.post("/register", isGuest, async (req, res) => {
    try {
        const { token, user } = await userService.register(req.body);
        res
            .cookie(AUTH_COOKIE_NAME, token, cookieOptions)
            .status(201)
            .json({ message: "Registration successful.", user, token });
    } catch (err) {
        res.status(400).json({ error: getErrorMessage(err) });
    }
});

authController.post("/login", isGuest, async (req, res) => {
    try {
        const { token, user } = await userService.login(
            req.body.email,
            req.body.password
        );
        res
            .cookie(AUTH_COOKIE_NAME, token, cookieOptions)
            .status(200)
            .json({ message: "Login successful.", user, token });
    } catch (err) {
        res.status(401).json({ error: getErrorMessage(err) });
    }
});

authController.post("/logout", isAuth, (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME, cookieOptions);
    return res.status(200).json({ message: "Logged out successfully." });
});

export default authController;
