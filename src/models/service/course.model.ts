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

export interface IDemoVideo extends Document {
    
};

export interface ICourse extends Document {
    name: string;
    thumbnail: string;
    language: string;
    startsOn: Date;
    expiresOn: Date;
    forWhomShort: string; // This line and above will also be a part of course card.
    shortDescription: string;
    longDescription: string
    promoVideo: string;
    teachers: Array<ITeacher>;
};