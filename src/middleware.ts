// IMPORTS.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSignInTokenData } from "./libs/getSignInTokenData";
import { SignInTokenData } from "./app/api/auth/sign-in/route";

// MIDDLEWARE.
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    let signInTokenData: SignInTokenData | null = null;
    const isApiRoute = path.startsWith("/api");
    const isGuestOnlyPath = path ==="/login";
    const isGeneralPath = path === "/" || path === "/login" || path === "/api" || path === "/api/auth/send-login-otp" || path === "/api/auth/sign-in"; // Guest-only paths are also included in general paths

    // Get sign-in token if it exists
    if (request.cookies.get("signInToken")?.value) {
        signInTokenData = await getSignInTokenData(request);
    };

    // Prevent logged in users trying from accessing "guest-only" routes.
    if (isGuestOnlyPath && signInTokenData?.id) {
        if (isApiRoute) {
            return NextResponse.json({
                success: false,
                message: "This routes is only for logged out users."
            }, { status: 401 });
        } else {
            return NextResponse.redirect(new URL("/me", request.nextUrl));
        };
    };

    // Prevent non-logged in users from trying to access login protected routes.
    if (!isGeneralPath && !signInTokenData?.id) {
        if (isApiRoute) {
            return NextResponse.json({
                success: false,
                message: "Thou shall not pass without logging in."
            }, { status: 401 });
        } else {
            return NextResponse.redirect(new URL("/login", request.nextUrl));
        };
    };

    // Prevent non-admins from accessing admin routes.
    if (!isGeneralPath && (!signInTokenData?.isAdmin)) {
        if (isApiRoute) {
            return NextResponse.json({
                success: false,
                message: "Go home dear, admins only route."
            }, { status: 401 });
        } else {
            return NextResponse.redirect(new URL("/login", request.nextUrl));
        };
    };
};

// Routes that will run the middleware.
export const config = {
    matcher: [
        "/",
        "/login",
        "/me",
        "/admin/:path*",
        "/api/:path*",
    ],
};