// services/bookingService.js
import Booking from "../models/Booking.js";
import Ride from "../models/Ride.js";
import mongoose from "mongoose";
import { approxDistanceFromDuration, ecoFromOccupants } from "../utils/ecoUtils.js";

async function recomputeRideEcoImpact(rideId) {
    const ride = await Ride.findById(rideId);
    if (!ride) throw new Error("Ride not found.");

    const active = await Booking.find({
        ride: rideId,
        status: { $ne: "cancelled" },
    })
        .select("passenger")
        .lean();

    const uniquePassengerIds = [...new Set(active.map((b) => String(b.passenger)))];

    // keep ObjectId type in ride.passengers
    ride.passengers = uniquePassengerIds.map((id) => new mongoose.Types.ObjectId(id));

    const occupants = 1 + uniquePassengerIds.length; // driver + unique passengers
    const distanceKm = ride.distanceKm ?? approxDistanceFromDuration(ride.durationMin);

    ride.ecoImpact = ecoFromOccupants(distanceKm, occupants);
    await ride.save();
}

export default {
    async create(rideId, passengerId, { seatsBooked = 1, noteToDriver }) {
        const seats = Math.max(1, Number(seatsBooked) || 1);

        // quick pre-checks
        const pre = await Ride.findById(rideId).select("driver seatsAvailable");
        if (!pre) throw new Error("Ride not found.");
        if (pre.driver.equals(passengerId)) throw new Error("Drivers cannot book their own rides.");
        if (pre.seatsAvailable < seats) throw new Error("Not enough seats available.");

        // create booking
        const booking = await Booking.create({
            ride: rideId,
            passenger: passengerId,
            seatsBooked: seats,
            noteToDriver,
            status: "confirmed",
        });

        // atomically decrement seats & add passenger once
        const updatedRide = await Ride.findOneAndUpdate(
            { _id: rideId, seatsAvailable: { $gte: seats } },
            { $inc: { seatsAvailable: -seats }, $addToSet: { passengers: passengerId } },
            { new: true }
        );
        if (!updatedRide) {
            await Booking.findByIdAndDelete(booking._id).catch(() => { });
            throw new Error("Seats were just taken. Please try another ride.");
        }

        await recomputeRideEcoImpact(rideId);

        // return populated booking
        return Booking.findById(booking._id)
            .populate({ path: "ride", populate: { path: "driver", select: "username rating" } })
            .populate("passenger", "username email");
    },

    async cancel(bookingId, passengerId) {
        const booking = await Booking.findById(bookingId);
        if (!booking) throw new Error("Booking not found.");
        if (!booking.passenger.equals(passengerId)) {
            throw new Error("You can only cancel your own bookings.");
        }

        booking.status = "cancelled";
        await booking.save();

        const ride = await Ride.findByIdAndUpdate(
            booking.ride,
            { $inc: { seatsAvailable: booking.seatsBooked } },
            { new: true }
        );

        if (ride) await recomputeRideEcoImpact(ride._id);

        return booking;
    },

    getByUser(userId) {
        return Booking.find({ passenger: userId })
            .populate({ path: "ride", populate: { path: "driver", select: "username rating car" } })
            .sort({ createdAt: -1 });
    },

    async getByRide(rideId, driverId) {
        const ride = await Ride.findById(rideId);
        if (!ride) throw new Error("Ride not found.");
        if (!ride.driver.equals(driverId)) throw new Error("Only the ride owner can view bookings.");

        return Booking.find({ ride: rideId })
            .populate("passenger", "username email rating")
            .sort({ createdAt: -1 });
    },

    // ✅ NEW: supports GET /api/bookings/:bookingId
    async getById(bookingId, requesterId) {
        const booking = await Booking.findById(bookingId)
            .populate({ path: "ride", populate: { path: "driver", select: "username rating" } })
            .populate("passenger", "username email");

        if (!booking) throw new Error("Booking not found.");

        const passengerId = String(booking.passenger?._id ?? booking.passenger);
        const driverId = String(booking.ride?.driver?._id ?? booking.ride?.driver);

        if (requesterId !== passengerId && requesterId !== driverId) {
            throw new Error("Forbidden");
        }

        return booking;
    },
};
