// IMPORTS.
import { NextRequest } from "next/server";
import { SignInTokenData } from "@/app/api/auth/sign-in/route";
import { jwtVerify } from "jose";

// GET TOKEN DATA (Get the signInToken from cookies > Decode it > Return it).
export async function getSignInTokenData(request: NextRequest): Promise<SignInTokenData> {
    const key = new TextEncoder().encode(process.env.TOKEN_SECRET);
    const signInToken = request.cookies.get("signInToken")?.value || "";
    const { payload } = await jwtVerify(signInToken, key);
    return payload as SignInTokenData;
};