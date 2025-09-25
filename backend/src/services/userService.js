// services/userService.js
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateAuthToken } from "../utils/userUtils.js";

export default {
    async register(userData) {
        const password = String(userData.password ?? "").normalize("NFKC").trim();
        const confirm = String(userData["confirm-password"] ?? userData.confirmPassword ?? userData.rePassword ?? "").normalize("NFKC").trim();

        if (!password || !confirm || password !== confirm) {
            throw new Error("Passwords do not match.");
        }

        const email = String(userData.email ?? "").trim().toLowerCase();
        const username = String(userData.username ?? "").trim();

        const existingByEmail = await User.findOne({ email });
        if (existingByEmail) {
            throw new Error("An account with this email already exists.");
        }


        const existingByUsername = await User.findOne({ username });
        if (existingByUsername) {
            throw new Error("An account with this username already exists.");
        }

        const newUser = await User.create({ username, email, password });

        const token = generateAuthToken(newUser);
        return {
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                ecoStats: newUser.ecoStats,
                rating: newUser.rating,
            },
        };
    },

    async login(email, password) {
        const user = await User.findOne({ email: String(email).toLowerCase().trim() });
        if (!user) throw new Error("No account found with this email.");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Incorrect password. Please try again.");

        const token = generateAuthToken(user);
        return {
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                ecoStats: user.ecoStats,
                rating: user.rating,
            },
        };
    },
};
