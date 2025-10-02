// services/userService.js
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateAuthToken } from "../utils/userUtils.js";

export default {
    async register(userData) {
        const password = String(userData.password ?? "").normalize("NFKC").trim();
        const confirm = String(
            userData["confirm-password"] ??
            userData.confirmPassword ??
            userData.rePassword ??
            ""
        )
            .normalize("NFKC")
            .trim();

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
                phoneNumber: newUser.phoneNumber ?? null,
                bio: newUser.bio ?? "",
                car: newUser.car ?? null,
            },
        };
    },

    async login(email, password) {
        const user = await User.findOne({
            email: String(email).toLowerCase().trim(),
        });
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
                phoneNumber: user.phoneNumber ?? null,
                bio: user.bio ?? "",
                car: user.car ?? null,
            },
        };
    },

    async updateProfile(userId, updates) {
        const allowedFields = ["username", "email", "phoneNumber", "bio", "car"];
        const updateData = {};

        for (const key of allowedFields) {
            if (updates[key] !== undefined) {
                updateData[key] = updates[key];
            }
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
            new: true,
            runValidators: true,
        }).select(
            "username email role ecoStats rating phoneNumber bio car tripsCompleted achievements createdAt updatedAt"
        );

        return updatedUser;
    },

    async getById(userId) {
        return User.findById(userId).select(
            "username email role ecoStats rating phoneNumber bio car tripsCompleted achievements createdAt updatedAt"
        );
    },
};
