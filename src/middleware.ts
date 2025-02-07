// IMPORTS.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSignInTokenData } from "./libs/getSignInTokenData";
import { SignInTokenData } from "./app/api/auth/sign-in/route";

// MIDDLEWARE (Extract "userId" from "signInToken" if it exists > Redirect logged in users away from publicOnlyPaths to "/me" > Allow only signed-in users in protected routes > Add routes in matcher).
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    let signInTokenData: SignInTokenData | null = null;
    const ispublicPath = path ==="/login"; // Future me, please don't use "/" here.
    const isApiRoute = path.startsWith("/api/");

    if (request.cookies.get("signInToken")?.value) {
        signInTokenData = getSignInTokenData(request);
    };

    if (ispublicPath && signInTokenData?.id) { // Logged in users trying to access "login" page.
        return NextResponse.redirect(new URL("/me", request.nextUrl));
    };

    if (!ispublicPath && !signInTokenData?.id) { // Non-logged in users trying to access login protected page.
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