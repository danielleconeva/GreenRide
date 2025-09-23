import express from "express";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import initDataBase from "./config/dbConfig.js";
import { SESSION_SECRET } from "./config/index.js";
import { auth } from "./middlewares/authMiddleware.js";
import { tempData } from "./middlewares/tempDataMiddleware.js";
import routes from "./routes.js";

const app = express();

initDataBase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true }
}));

app.use(auth);
app.use(tempData);

app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API server running on port ${PORT}`));
