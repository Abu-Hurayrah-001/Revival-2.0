// IMPORTS
import mongoose, { Schema, Document } from "mongoose";

// INTERFACES
export interface IUser extends Document {
    email: string;
    password: string;
    courseIds?: [string];
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
    courseIds: {
        type: [String],
        required: false,
    },
}, {timestamps: true});

const User = mongoose.models.users || mongoose.model("User", userSchema);
export default User;