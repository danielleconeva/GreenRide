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
        seatsAvailable: { type: Number, required: true, min: 0 },

        amenities: {
            airConditioning: { type: Boolean, default: false },
            music: { type: Boolean, default: false },
            smokingAllowed: { type: Boolean, default: false },
            petsAllowed: { type: Boolean, default: false },
        },

        passengers: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
        ecoImpact: {
            perPersonKg: { type: Number, default: 0 },
            totalKg: { type: Number, default: 0 },
        },
        notes: {
            type: String,
            trim: true,
            maxlength: [300, "Notes cannot exceed 300 characters."]
        },
    },
    { timestamps: true }
);

const Ride = model("Ride", rideSchema);
export default Ride;
