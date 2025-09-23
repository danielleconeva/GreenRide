import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import rideService from "../services/rideService.js";

const rideController = Router();

rideController.get("/", async (req, res) => {
    try {
        const { from, to, date } = req.query;

        let rides;
        if (from || to || date) {
            rides = await rideService.search({ from, to, date });
        } else {
            rides = await rideService.getAll();
        }

        res.status(200).json(rides);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch rides." });
    }
});

rideController.post("/", isAuth, async (req, res) => {
    const rideData = req.body;
    const driverId = req.user.id;

    try {
        const ride = await rideService.create(rideData, driverId);
        res.status(201).json({ message: "Ride created successfully.", ride });
    } catch (err) {
        res.status(400).json({ error: getErrorMessage(err) });
    }
});

rideController.get("/:rideId", async (req, res) => {
    try {
        const ride = await rideService.getById(req.params.rideId);
        if (!ride) {
            return res.status(404).json({ error: "Ride not found." });
        }
        res.status(200).json(ride);
    } catch (err) {
        res.status(400).json({ error: "Invalid ride ID." });
    }
});

rideController.put("/:rideId", isAuth, async (req, res) => {
    const rideId = req.params.rideId;
    const driverId = req.user.id;
    const updates = req.body;

    try {
        const updatedRide = await rideService.update(rideId, updates, driverId);
        res.status(200).json({ message: "Ride updated successfully.", ride: updatedRide });
    } catch (err) {
        res.status(400).json({ error: getErrorMessage(err) });
    }
});

rideController.delete("/:rideId", isAuth, async (req, res) => {
    const rideId = req.params.rideId;
    const driverId = req.user.id;

    try {
        await rideService.delete(rideId, driverId);
        res.status(200).json({ message: "Ride deleted successfully." });
    } catch (err) {
        res.status(403).json({ error: "You are not allowed to delete this ride." });
    }
});

export default rideController;
