import Booking from "../models/Booking.js";
import Ride from "../models/Ride.js";
import { approxDistanceFromDuration, ecoFromOccupants } from "../utils/ecoUtils.js";

async function recomputeRideEcoImpact(rideId) {
    const ride = await Ride.findById(rideId);
    if (!ride) throw new Error("Ride not found.");

    const active = await Booking.find({ ride: rideId, status: { $ne: "cancelled" } })
        .select("passenger")
        .lean();

    const uniquePassengerIds = [...new Set(active.map(b => String(b.passenger)))];

    ride.passengers = uniquePassengerIds;

    const occupants = 1 + uniquePassengerIds.length;
    const distanceKm = ride.distanceKm ?? approxDistanceFromDuration(ride.durationMin);

    ride.ecoImpact = ecoFromOccupants(distanceKm, occupants);
    await ride.save();
}

export default {
    async create(rideId, passengerId, { seatsBooked = 1, noteToDriver }) {
        const ride = await Ride.findById(rideId);
        if (!ride) throw new Error("Ride not found.");
        if (ride.seatsAvailable < seatsBooked) throw new Error("Not enough seats available.");
        if (ride.driver.equals(passengerId)) throw new Error("Drivers cannot book their own rides.");

        const booking = await Booking.create({
            ride: rideId,
            passenger: passengerId,
            seatsBooked: Number(seatsBooked) || 1,
            noteToDriver,
            status: "confirmed",
        });

        ride.seatsAvailable -= Number(seatsBooked) || 1;
        if (!ride.passengers.map(p => String(p)).includes(String(passengerId))) {
            ride.passengers.push(passengerId);
        }
        await ride.save();

        await recomputeRideEcoImpact(rideId);

        return booking;
    },

    async cancel(bookingId, passengerId) {
        const booking = await Booking.findById(bookingId);
        if (!booking) throw new Error("Booking not found.");
        if (!booking.passenger.equals(passengerId)) throw new Error("You can only cancel your own bookings.");

        // Mark cancelled
        booking.status = "cancelled";
        await booking.save();

        // Restore seats
        const ride = await Ride.findById(booking.ride);
        ride.seatsAvailable += booking.seatsBooked;
        await ride.save();

        await recomputeRideEcoImpact(booking.ride);

        return booking;
    },

    getByUser(userId) {
        return Booking.find({ passenger: userId })
            .populate({
                path: "ride",
                populate: { path: "driver", select: "username rating car" },
            })
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
};
