// IMPORTS
import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

// LOGIN SESSION
type SessionPayload = {
    userId: string;
    expiresAt: Date;
};

const secretKey: string = process.env.SESSION_SECRET || "";
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodedKey)
};

export async function deleteSession() {
    
}

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ userId, expiresAt });

    cookies().set("session", session, {
        httpOnly:true,
        secure: true,
        expires: expiresAt,
    });
};

