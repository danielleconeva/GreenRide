import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateAuthToken } from "../utils/userUtils.js";

export default {

    async register(userData) {
        if (userData.password !== userData.rePassword) {
            throw new Error("Passwords do not match.");
        }

        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error("An account with this email already exists.");
        }

        const newUser = await User.create(userData);
        const token = generateAuthToken(newUser);

        return {
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                ecoStats: newUser.ecoStats,
                rating: newUser.rating
            }
        };
    },

    async login(email, password) {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("No account found with this email.");
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error("Incorrect password. Please try again.");
        }

        const token = generateAuthToken(user);

        return {
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                ecoStats: user.ecoStats,
                rating: user.rating
            }
        };
    }
};
