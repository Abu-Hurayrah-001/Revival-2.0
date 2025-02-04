// IMPORTS
import mongoose from "mongoose";

// CONNECT TO MONGO_DB
type ConnectionObject = {
    isConnected?: number
};

const connection: ConnectionObject = {};

export async function connectPrimaryDb(): Promise<void> {
    if (connection.isConnected) {
        console.log("You are already connected to the database, dear.");
    } else {
        try {
            const db = await mongoose.connect(process.env.MONGO_URI || "");
            connection.isConnected = db.connections[0].readyState;
            console.log("Database connected. Launching Skynet in 3,2,1...");
            return;
        } catch (error) {
            console.log("Database connection failed. Gonnar cry?", error);
        };
    }
};