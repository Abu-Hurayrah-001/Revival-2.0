// IMPORTS
import mongoose, { Schema, Document } from "mongoose";

// INTERFACES
export interface IUser extends Document {
    email: string;
    password: string;
    forgotPasswordToken?: string;
    forgotPasswordTokenExpiry?: Date;
};

// SCHEMAS
const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: [true, "Please provide an email."],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password."],
    },
    forgotPasswordToken: {
        type: String,
        required: false,
    },
    forgotPasswordTokenExpiry: {
        type: Date,
        required: false,
    },
}, {timestamps: true});

const User = mongoose.models.users || mongoose.model("User", userSchema);
export default User;