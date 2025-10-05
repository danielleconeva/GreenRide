import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import initDataBase from "./config/dbConfig.js";
import { auth } from "./middlewares/authMiddleware.js";
import routes from "./routes.js";
import cors from "cors";

const app = express();

initDataBase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
    "http://localhost:5173",
    "https://green-ride-flax.vercel.app"
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use(auth);

app.use("/api", routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`API server running on port ${PORT}`));
