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
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    courseIds: {
        type: [String],
        required: false,
    },
}, {timestamps: true});

export default mongoose.model<IUser>("User", userSchema);