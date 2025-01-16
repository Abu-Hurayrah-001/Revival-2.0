// IMPORTS
import { z } from "zod";

// SIGN UP SCHEMA
export const signInSchema = z.object({
    phoneNumber: z
        .number()
        .refine((val: number) => val.toString().length === 10, {
            message: "Phone number must have 10 digits."
        })
    ,
    OTP: z
        .number()
        .refine((val: number) => val.toString().length === 4, {
            message: "OTP must have 4 digits."
        })
});