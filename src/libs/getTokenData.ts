// IMPORTS
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { TokenData } from "@/app/api/auth/sign-in/route";

// GET TOKEN DATA
export function getTokenData(request: NextRequest) {
    const signInToken = request.cookies.get("signInToken")?.value || "";
    const decodedToken = jwt.verify(signInToken, process.env.LOGIN_TOKEN_SECRET!) as TokenData;
    return decodedToken.id;
};