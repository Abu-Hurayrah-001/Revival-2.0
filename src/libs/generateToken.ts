// IMPORTS.
import { JWTPayload, SignJWT } from "jose";

// CREATING TOKEN
export async function generateToken(payload: JWTPayload): Promise<string> {
    const key = new TextEncoder().encode(process.env.TOKEN_SECRET);
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(key)
};