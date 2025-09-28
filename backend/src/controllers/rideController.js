import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import rideService from "../services/rideService.js";
import Ride from "../models/Ride.js";
import { approxDistanceFromDuration, ecoFromOccupants } from "../utils/ecoUtils.js";

const rideController = Router();

rideController.get("/", async (req, res) => {
    try {
        const { from, to, date, passengers } = req.query;

        const rides =
            from || to || date || passengers
                ? await rideService.search({ from, to, date, passengers })
                : await rideService.getAll();

        const populated = await Ride.populate(rides, {
            path: "driver",
            select: "username rating car",
        });

        res.status(200).json(populated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch rides." });
    }
});

rideController.post("/", isAuth, async (req, res) => {
    try {
        const { driver: _ignore, ...rideData } = req.body;
        const driverId = req.user.id;

        const durationMin = Number(rideData.durationMin) || 0;
        const distanceKm = approxDistanceFromDuration(durationMin);

        const occupants = 1;
        const ecoImpact = ecoFromOccupants(distanceKm, occupants);

        const ride = await rideService.create(
            {
                ...rideData,
                distanceKm,
                ecoImpact,
            },
            driverId
        );

        await ride.populate({ path: "driver", select: "username rating car" });
        res.status(201).json(ride);
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

        await ride.populate({ path: "driver", select: "username rating car" });
        res.status(200).json(ride);
    } catch (err) {
        res.status(400).json({ error: "Invalid ride ID." });
    }
});

rideController.put("/:rideId", isAuth, async (req, res) => {
    try {
        const rideId = req.params.rideId;
        const driverId = req.user.id;
        const updates = req.body;

        const updatedRide = await rideService.update(rideId, updates, driverId);

        await updatedRide.populate({ path: "driver", select: "username rating car" });

        res.status(200).json({ message: "Ride updated successfully.", ride: updatedRide });
    } catch (err) {
        res.status(400).json({ error: getErrorMessage(err) });
    }
});

rideController.delete("/:rideId", isAuth, async (req, res) => {
    try {
        const rideId = req.params.rideId;
        const driverId = req.user.id;

        await rideService.delete(rideId, driverId);
        res.status(200).json({ message: "Ride deleted successfully." });
    } catch (err) {
        res.status(403).json({ error: getErrorMessage(err) || "You are not allowed to delete this ride." });
    }
});

export default rideController;
