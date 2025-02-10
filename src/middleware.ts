// IMPORTS.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSignInTokenData } from "./libs/getSignInTokenData";
import { SignInTokenData } from "./app/api/auth/sign-in/route";

// MIDDLEWARE.
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    let signInTokenData: SignInTokenData | null = null;
    const ispublicPath = path ==="/login"; // Future me, please don't use "/" here.
    const isApiRoute = path.startsWith("/api/");

    // Get sign-in token if it exists
    if (request.cookies.get("signInToken")?.value) {
        signInTokenData = await getSignInTokenData(request);
    };

    // Prevent logged in users trying from accessing "login" page.
    if (ispublicPath && signInTokenData?.id) {
        return NextResponse.redirect(new URL("/me", request.nextUrl));
    };

    // Prevent non-logged in users from trying to access login protected page.
    if (!ispublicPath && !signInTokenData?.id) {
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
    if (!ispublicPath && (!signInTokenData?.id || signInTokenData?.isAdmin)) {
        if (isApiRoute) {
            return NextResponse.json({
                success: false,
                message: "You are being discriminated against because you are not an admin."
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
        "/admin",
        "/api/me",
        // "/api/auth/:path*",
        // "/api/admin/:path*" NOT WORKING . Also, does middleware continously run?
    ],
};