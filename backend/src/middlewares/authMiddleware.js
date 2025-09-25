import { AUTH_COOKIE_NAME, JWT_SECRET } from "../config/index.js";
import jwt from "jsonwebtoken";
import { cookieOptions } from "../config/cookieOptions.js";

export function auth(req, res, next) {
    const token = req.cookies[AUTH_COOKIE_NAME];

    if (!token) {
        req.isAuthenticated = false;
        req.user = null;
        return next();
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);

        const id = payload.id || payload._id || payload.sub;
        if (!id) {
            req.isAuthenticated = false;
            req.user = null;
            return res.status(401).json({ error: "Invalid token payload" });
        }

        req.isAuthenticated = true;
        req.user = {
            id,
            email: payload.email,
            username: payload.username,
        };

        return next();
    } catch (err) {

        res.clearCookie(AUTH_COOKIE_NAME, cookieOptions);
        req.isAuthenticated = false;
        req.user = null;
        return res.status(401).json({ error: "Invalid or expired token. Please log in again." });
    }
}

export function isAuth(req, res, next) {
    if (!req.isAuthenticated || !req.user) {
        return res.status(401).json({ error: "Authentication required." });
    }
    return next();
}

export function isGuest(req, res, next) {
    if (req.isAuthenticated && req.user) {
        return res.status(403).json({ error: "You are already logged in." });
    }
    return next();
}
