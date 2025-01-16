// IMPORTS
import mongoose, { Schema, Document } from "mongoose";

// INTERFACES
export interface IUser extends Document {
    phoneNumber: number;
    OTP: number;
}

// SCHEMAS
const userSchema = new Schema<IUser>({
    phoneNumber: {
        type: Number,
        required: [true, "Please enter your phone number."],
    },
    OTP: {
        type: Number,
        required: [true, "Please enter the OTP."]
    },
}, {timestamps: true});

const User = mongoose.models.users || mongoose.model("User", userSchema);
export default User;