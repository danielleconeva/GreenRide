import Booking from "../models/Booking.js";
import Ride from "../models/Ride.js";

export default {

    async create(rideId, passengerId, { seatsBooked = 1, noteToDriver }) {
        const ride = await Ride.findById(rideId);

        if (!ride) {
            throw new Error("Ride not found.");
        }
        if (ride.seatsAvailable < seatsBooked) {
            throw new Error("Not enough seats available.");
        }
        if (ride.driver.equals(passengerId)) {
            throw new Error("Drivers cannot book their own rides.");
        }

        const booking = await Booking.create({
            ride: rideId,
            passenger: passengerId,
            seatsBooked,
            noteToDriver,
            status: "confirmed"
        });

        ride.seatsAvailable -= seatsBooked;
        if (!ride.passengers.includes(passengerId)) {
            ride.passengers.push(passengerId);
        }
        await ride.save();

        return booking;
    },

    async cancel(bookingId, passengerId) {
        const booking = await Booking.findById(bookingId).populate("ride");

        if (!booking) {
            throw new Error("Booking not found.");
        }
        if (!booking.passenger.equals(passengerId)) {
            throw new Error("You can only cancel your own bookings.");
        }

        booking.status = "cancelled";
        await booking.save();

        const ride = await Ride.findById(booking.ride._id);
        ride.seatsAvailable += booking.seatsBooked;
        ride.passengers = ride.passengers.filter(
            (p) => p.toString() !== passengerId.toString()
        );
        await ride.save();

        return booking;
    },

    getByUser(userId) {
        return Booking.find({ passenger: userId })
            .populate("ride")
            .sort({ createdAt: -1 });
    },

    async getByRide(rideId, driverId) {
        const ride = await Ride.findById(rideId);

        if (!ride) {
            throw new Error("Ride not found.");
        }
        if (!ride.driver.equals(driverId)) {
            throw new Error("Only the ride owner can view bookings.");
        }

        return Booking.find({ ride: rideId })
            .populate("passenger", "username email rating")
            .sort({ createdAt: -1 });
    }
};
