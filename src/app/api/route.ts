// IMPORTS
import { NextResponse } from "next/server";

// BACKEND HOMEPAGE
export async function GET() {
    return NextResponse.json({
        success: true,
        message: "One simply does not hit this route accidently.",
    }, { status: 200 });
};