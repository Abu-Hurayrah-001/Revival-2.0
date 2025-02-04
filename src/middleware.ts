// IMPORTS.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getTokenData } from "./libs/getTokenData";

// MIDDLEWARE (Redirect logged in users away from publicOnlyPaths to "/me" > Allow only signed-in users in protected routes > Add routes in matcher).
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    let userId = null;
    const isNonLoggedInUsersPath = path ==="/login";
    const isApiRoute = path.startsWith("/api/");

    if (request.cookies.get("signInToken")?.value) {
        userId = getTokenData(request);
    };

    if (isNonLoggedInUsersPath && userId) { // Logged in users trying to access "login" page.
        return NextResponse.redirect(new URL("/me", request.nextUrl));
    };

    if (!isNonLoggedInUsersPath && !userId) { // Non-logged in users trying to access login protected page.
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