// IMPORTS.
import mongoose, { Schema, Document } from "mongoose";

// INTERFACES.
export interface IUser extends Document {
    email: string;
    OTP?: number;
    OTPexpiry?: Date;
    isAdmin?: boolean;
}

// SCHEMAS
const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: [true, "Please enter your email."],
    },
    OTP: {
        type: Number,
        required: false,
    },
    OTPexpiry: {
        type: Date,
        required: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: false,
    },
}, {timestamps: true});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;