import { AUTH_COOKIE_NAME, JWT_SECRET } from "../config/index.js";
import jsonwebtoken from "jsonwebtoken";

export function auth(req, res, next) {
    const token = req.cookies[AUTH_COOKIE_NAME];

    if (!token) {
        req.isAuthenticated = false;
        return next();
    }

    try {
        const user = jsonwebtoken.verify(token, JWT_SECRET);

        req.isAuthenticated = true;
        req.user = user;

        next();
    } catch (err) {
        res.clearCookie(AUTH_COOKIE_NAME);
        req.isAuthenticated = false;
        return res.status(401).json({ error: "Invalid or expired token. Please log in again." });
    }
}

export function isAuth(req, res, next) {
    if (!req.isAuthenticated) {
        return res.status(401).json({ error: "Authentication required." });
    }
    next();
}

export function isGuest(req, res, next) {
    if (req.isAuthenticated) {
        return res.status(403).json({ error: "You are already logged in." });
    }
    next();
}
