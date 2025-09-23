import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME || "auth";
