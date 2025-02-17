// IMPORTS.
import mongoose, { Schema, Document } from "mongoose";

// SERVICE MODEL.
export interface IService extends Document {
    name: string;
    description: string;
};