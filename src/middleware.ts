// IMPORTS
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// MIDDLEWARE (Redirect logged in users away from publicOnlyPaths to "/me" > Allow only signed-in users in protected routes > Add routes in matcher)
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const ispublicOnlypath = path ==="/login"; // Future me, please do not put "/" here
    const signInToken = request.cookies.get("signInToken")?.value || "";
    const isApiRoute = path.startsWith("/api/");

    if (ispublicOnlypath && signInToken) {
        return NextResponse.redirect(new URL("/me", request.nextUrl));
    };

    if (!ispublicOnlypath && !signInToken) {
        if (isApiRoute) {
            return NextResponse.json({
                success: false,
                message: "Thou shall not pass without logging in."
            }, { status: 401 });
        } else {
            return NextResponse.redirect(new URL("/login", request.nextUrl));
        };
    };
};

export const config = {
    matcher: [
        "/",
        "/login",
        "/me",
        "/admin",
        "/api/me",
        "/api/auth/logout",
    ],
};