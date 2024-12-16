// IMPORTS
import { NextResponse } from "next/server";

// BACKEND HOMEPAGE
export async function GET() {
    return NextResponse.json({
        status: 200,
        message: "One simply does not hit this route accidently."
    });
};