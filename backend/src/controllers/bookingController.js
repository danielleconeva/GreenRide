import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import bookingService from "../services/bookingService.js";

const bookingController = Router();

bookingController.post("/", isAuth, async (req, res) => {
    const passengerId = req.user.id;
    const { rideId, seatsBooked = 1, noteToDriver } = req.body;

    try {
        const booking = await bookingService.create(rideId, passengerId, {
            seatsBooked,
            noteToDriver,
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

/** GET BY ID — GET /api/bookings/:bookingId
 *  Place this AFTER /my and /ride/:rideId so "my" doesn't match :bookingId
 */
bookingController.get("/:bookingId", isAuth, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.bookingId)
            .populate({
                path: "ride",
                populate: { path: "driver", select: "username rating" },
            })
            .populate("passenger", "username email");

        if (!booking) return res.status(404).json({ error: "Booking not found." });

        const isPassenger =
            String(booking.passenger?._id || booking.passenger) === req.user.id;
        const isDriver =
            String(booking.ride?.driver?._id || booking.ride?.driver) === req.user.id;

        if (!isPassenger && !isDriver) {
            return res.status(403).json({ error: "Forbidden" });
        }

        res.status(200).json(booking);
    } catch (err) {
        res.status(400).json({ error: getErrorMessage(err) });
    }
});


export default bookingController;
