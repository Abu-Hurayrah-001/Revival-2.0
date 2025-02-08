// IMPORTS.
import { NextRequest, NextResponse } from "next/server";
import { getSignInTokenData } from "@/libs/getSignInTokenData";
import User, { IUser } from "@/models/user/uer.model";
import { connectPrimaryDb } from "@/libs/connectPrimaryDb";

// GET USER DATA.
export async function GET(request: NextRequest): Promise<NextResponse> {
    // Extract "_id" from sign-in token and use it to find user from db.
    await connectPrimaryDb();
    try {
        const signInTokenData = await getSignInTokenData(request);
        const user: IUser | null = await User.findOne({ _id: signInTokenData.id }).select("-OTP -OTPexpiry");

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