// IMPORTS
import { z } from "zod";

// SIGN UP SCHEMA
export const sendOTPSchema = z.object({ email: z.string().email() });