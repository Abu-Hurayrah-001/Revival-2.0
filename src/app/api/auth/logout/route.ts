// IMPORTS
import { NextResponse } from "next/server";

// LOGOUT
export async function GET(): Promise<NextResponse> {
    try {
        const response = NextResponse.json({
            success: true,
            message: "Logged out successfully, dear.",
        }, { status: 200 });

        response.cookies.set("signInToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0,
        });

        return response;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Oopsies! An unknown error has occured."
        return NextResponse.json({
            success: false,
            error: errorMessage,
        }, { status: 500 });
    };
};