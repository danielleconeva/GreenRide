import { Schema, model } from "mongoose";

const rideSchema = new Schema(
    {
        driver: { type: Schema.Types.ObjectId, ref: "User", required: true },

        from: { type: String, required: [true, "Departure location is required."] },
        to: { type: String, required: [true, "Destination is required."] },

        departureDate: { type: Date, required: true },
        departureTime: { type: String, required: true },
        arrivalTime: { type: String, required: true },
        durationMin: { type: Number, required: true },
        pricePerSeat: { type: Number, required: true },
        seatsAvailable: { type: Number, required: true, min: 1 },

        amenities: {
            airConditioning: { type: Boolean, default: false },
            music: { type: Boolean, default: false },
            smokingAllowed: { type: Boolean, default: false },
            petsAllowed: { type: Boolean, default: false },
        },

        ecoImpact: {
            co2SavedKg: { type: Number, default: 0 },
        },

        passengers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

const Ride = model("Ride", rideSchema);
export default Ride;
