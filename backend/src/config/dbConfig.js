import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function initDataBase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Database connection failed");
        console.error(err.message);
        process.exit(1);
    }
}

export default initDataBase;
