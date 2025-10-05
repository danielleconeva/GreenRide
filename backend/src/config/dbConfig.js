import mongoose from "mongoose";

async function initDataBase() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.MONGO_DB_NAME || "greenride"
        });
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Database connection failed");
        console.error(err.message);
        process.exit(1);
    }
}

export default initDataBase;
