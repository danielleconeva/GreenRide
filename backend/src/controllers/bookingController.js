import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import bookingService from "../services/bookingService.js";

const bookingController = Router();

bookingController.post("/:rideId", isAuth, async (req, res) => {
    const passengerId = req.user.id;
    const { seatsBooked, noteToDriver } = req.body;

    try {
        const booking = await bookingService.create(req.params.rideId, passengerId, {
            seatsBooked,
            noteToDriver
        });
        res.status(201).json({ message: "Booking confirmed.", booking });
    } catch (err) {
        res.status(400).json({ error: getErrorMessage(err) });
    }
});

bookingController.delete("/:bookingId", isAuth, async (req, res) => {
    const passengerId = req.user.id;

    try {
        const booking = await bookingService.cancel(req.params.bookingId, passengerId);
        res.status(200).json({ message: "Booking cancelled.", booking });
    } catch (err) {
        res.status(400).json({ error: getErrorMessage(err) });
    }
});

bookingController.get("/my", isAuth, async (req, res) => {
    try {
        const bookings = await bookingService.getByUser(req.user.id);
        res.status(200).json(bookings);
    } catch (err) {
        res.status(400).json({ error: "Failed to fetch user bookings." });
    }
});

bookingController.get("/ride/:rideId", isAuth, async (req, res) => {
    try {
        const bookings = await bookingService.getByRide(req.params.rideId, req.user.id);
        res.status(200).json(bookings);
    } catch (err) {
        res.status(403).json({ error: getErrorMessage(err) });
    }
});

export default bookingController;
