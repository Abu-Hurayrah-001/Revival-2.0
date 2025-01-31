// IMPORTS
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// MIDDLEWARE
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const ispublicpath = path ==="/login"; // Future me, please do not put "/" here
    const signInToken = request.cookies.get("signInToken")?.value || "";

    if (ispublicpath && signInToken) {
        return NextResponse.redirect(new URL("/me", request.nextUrl));
    };

    if (!ispublicpath && !signInToken) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    };
};

export const config = {
    matcher: [
        "/",
        "/login",
        "/me",
        "/admin",
    ],
};