// IMPORTS
import { z } from "zod";

// SIGN UP SCHEMA
export const signUpSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." }),
});