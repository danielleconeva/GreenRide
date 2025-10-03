import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required."],
        unique: true,
        trim: true,
        minlength: [3, "Username must be at least 3 characters long."],
        maxlength: [20, "Username cannot exceed 20 characters."]
    },
    email: {
        type: String,
        required: [true, "Email address is required."],
        unique: true,
        lowercase: true,
        match: [/.+@.+\..+/, "Please provide a valid email address."]
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [6, "Password must be at least 6 characters long."]
    },
    phoneNumber: {
        type: String,
        trim: true,
        match: [/^\+?[0-9\s-]{7,15}$/, "Please provide a valid phone number."]
    },
    role: {
        type: String,
        enum: ["passenger", "driver"],
        default: "passenger"
    },
    bio: {
        type: String,
        trim: true,
        maxlength: [300, "Bio cannot exceed 300 characters."]
    },

    car: {
        make: { type: String, trim: true },
        model: { type: String, trim: true },
        year: { type: String, trim: true },
        color: { type: String, trim: true },
        licensePlate: { type: String, trim: true }
    },

    ecoStats: {
        totalRides: { type: Number, default: 0 },
        co2SavedKg: { type: Number, default: 0 },
        moneySaved: { type: Number, default: 0 }
    },

    achievements: [
        {
            name: { type: String, required: true },
            description: { type: String },
            unlockedAt: { type: Date, default: Date.now }
        }
    ],

    rating: { type: Number, default: 0, min: 0, max: 5 },
    tripsCompleted: { type: Number, default: 0 }
}, { timestamps: true });


userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = model("User", userSchema);
export default User;
