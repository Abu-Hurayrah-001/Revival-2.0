// IMPORTS
import { z } from "zod";

// SIGN UP SCHEMA
export const sendOTPSchema = z.object({
    phoneNumber: z
        .number()
        .refine((val: number) => val.toString().length === 10, {
            message: "Phone number must have 10 digits."
        })
});