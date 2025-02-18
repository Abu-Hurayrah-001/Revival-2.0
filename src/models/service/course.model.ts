// IMPORTS.
import { Document } from "mongoose";

// COURSE MODEL.
export interface ISocialLinks extends Document {
    platform: string;
    url: string;
};

export interface ITeacher extends Document {
    name: string;
    photo?: string;
    experience: string;
    description: string;
    socialLinks?: Array<ISocialLinks>; // Future me, please ensure that maximum no. of allowed social links is 3 via schema-level validator.
};

export interface ICourse extends Document {
    name: string;
    shortDescription: string;
    longDescription: string
    thumbnail: string;
    promoVideo: string;
    teachers: Array<ITeacher>;
};