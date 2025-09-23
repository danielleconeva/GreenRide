import Ride from "../models/Ride.js";

export default {

    getAll() {
        return Ride.find().populate("driver", "username rating");
    },

    search({ from, to, date }) {
        const query = {};

        if (from) {
            query.from = { $regex: from, $options: "i" };
        }
        if (to) {
            query.to = { $regex: to, $options: "i" };
        }
        if (date) {

            const dayStart = new Date(date);
            dayStart.setHours(0, 0, 0, 0);

            const dayEnd = new Date(date);
            dayEnd.setHours(23, 59, 59, 999);

            query.departureTime = { $gte: dayStart, $lte: dayEnd };
        }

        return Ride.find(query).populate("driver", "username rating");
    },

    getById(rideId) {
        return Ride.findById(rideId).populate("driver passengers", "username rating");
    },

    create(rideData, driverId) {
        return Ride.create({ ...rideData, driver: driverId });
    },

    async update(rideId, updates, driverId) {
        const ride = await Ride.findById(rideId);

        if (!ride) {
            throw new Error("Ride not found.");
        }
        if (!ride.driver.equals(driverId)) {
            throw new Error("You must be the ride owner to update this ride.");
        }

        Object.assign(ride, updates);
        return ride.save();
    },

    async delete(rideId, driverId) {
        const ride = await Ride.findById(rideId);

        if (!ride) {
            throw new Error("Ride not found.");
        }
        if (!ride.driver.equals(driverId)) {
            throw new Error("You are not allowed to delete this ride.");
        }

        return Ride.findByIdAndDelete(rideId);
    }
};
