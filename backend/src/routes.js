import { Router } from "express";
import authController from "./controllers/authController.js";
import rideController from "./controllers/rideController.js";
import bookingController from "./controllers/bookingController.js";
import userController from "./controllers/userController.js";

const routes = Router();

routes.use("/auth", authController);

routes.use("/users", userController);

routes.use("/rides", rideController);

routes.use("/bookings", bookingController);

routes.all("*url", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});

export default routes;
