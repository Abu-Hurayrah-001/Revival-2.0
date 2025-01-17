// IMPORTS
import mongoose, { Schema, Document } from "mongoose";

// INTERFACES
export interface IUser extends Document {
    phoneNumber: number;
    OTP?: number;
    OTPexpiry?: Date;
}

// SCHEMAS
const userSchema = new Schema<IUser>({
    phoneNumber: {
        type: Number,
        required: [true, "Please enter your phone number."],
    },
    OTP: {
        type: Number,
        required: false,
    },
    OTPexpiry: {
        type: Date,
        required: false,
    },
}, {timestamps: true});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;