import { Schema, model } from "mongoose";

const bookingSchema = new Schema({
    ride: { type: Schema.Types.ObjectId, ref: "Ride", required: true },
    passenger: { type: Schema.Types.ObjectId, ref: "User", required: true },
    seatsBooked: { type: Number, default: 1 },
    noteToDriver: { type: String, trim: true },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending"
    }
}, { timestamps: true });

const Booking = model("Booking", bookingSchema);
export default Booking;
