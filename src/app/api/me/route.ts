// IMPORTS.
import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/libs/getTokenData";
import User, { IUser } from "@/models/user/uer.model";
import { connectPrimaryDb } from "@/libs/connectPrimaryDb.lib";

// GET USER DATA (Get user Id from signInToken > Send user data).
connectPrimaryDb();
export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const userId = getTokenData(request);
        const user: IUser | null = await User.findOne({ _id: userId }).select("-OTP -OTPexpiry");

        if (!user) {
            return NextResponse.json({
                success: false,
                error: "User doesn't exist. Gonna cry?"
            }, { status: 409 });
        };

        return NextResponse.json({
            success: true,
            message: "You are found.",
            data: user,
        }, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Oopsies! An unknown error has occured."
        return NextResponse.json({
            success: false,
            error: errorMessage,
        }, { status: 500 });
    };
};