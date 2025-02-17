// IMPORTS.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSignInTokenData } from "./libs/getSignInTokenData";
import { SignInTokenData } from "./app/api/auth/sign-in/route";
import { guestPaths } from "./constants/guestPaths";
import { adminPaths } from "./constants/adminPaths";
import { userPaths } from "./constants/userPaths";

// MIDDLEWARE.
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    let signInTokenData: SignInTokenData | null = null;
    const isApiRoute = path.startsWith("/api");
    const isGuestPath = guestPaths.includes(path); // Guest paths are those paths that only logged-out users can access and not logged-in users.
    const isUserPath = userPaths.includes(path);
    const isAdminPath = adminPaths.includes(path);

    // Get sign-in token if it exists
    if (request.cookies.get("signInToken")?.value) {
        signInTokenData = await getSignInTokenData(request);
    };

    // Prevent logged in users trying from accessing "guest-only" routes.
    if (isGuestPath && signInTokenData?.id) {
        if (isApiRoute) {
            return NextResponse.json({
                success: false,
                message: "Thou shall not pass without logging out.",
            }, { status: 401 });
        } else {
            return NextResponse.redirect(new URL("/me", request.nextUrl));
        };
    };

    // Prevent non-logged in users from trying to access login protected routes.
    if (isUserPath && !signInTokenData?.id) {
        if (isApiRoute) {
            return NextResponse.json({
                success: false,
                message: "Thou shall not pass without logging in.",
            }, { status: 401 });
        } else {
            return NextResponse.redirect(new URL("/login", request.nextUrl));
        };
    };

    // Prevent non-admins from accessing admin routes.
    if (isAdminPath && (!signInTokenData?.isAdmin)) {
        if (isApiRoute) {
            return NextResponse.json({
                success: false,
                message: "Go home dear, admins only route.",
            }, { status: 401 });
        } else {
            return NextResponse.redirect(new URL("/login", request.nextUrl));
        };
    };
};

// Routes that will run the middleware.
export const config = {
    matcher: [
        "/login",
        "/me/:path*",
        "/admin/:path*",
        "/api/:path*",
    ],
};