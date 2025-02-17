// IMPORTS.
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectPrimaryDb } from "@/libs/connectPrimaryDb";
import User, { IUser } from "@/models/user/uer.model";
import { generateToken } from "@/libs/generateToken";

// SIGN IN.
type SignInData = {
    email: string;
    OTP: number;
};

export type SignInTokenData = { 
    id: string;
    isAdmin?: boolean;
};

const signInSchema = z.object({
    email: z.string().email(),
    OTP: z
        .number()
        .refine((val: number) => val.toString().length === 4, {
            message: "OTP must have 4 digits."
        })
});

export async function POST(request: NextRequest): Promise<NextResponse> {
    await connectPrimaryDb();
    try {
        // Validate request data.
        const reqBody: SignInData = await request.json();
        const parsedData = signInSchema.safeParse(reqBody);

        if (!parsedData.success) {
            return NextResponse.json({
                success: false,
                error: parsedData.error.issues[0].message
            }, { status: 400 });
        };

        // Find user.
        const { email, OTP } = reqBody;
        const user = await User.findOne({ email }) as IUser;

        if (!user) {
            return NextResponse.json({
                success: false,
                error: "User doesn't exist. Gonna cry?"
            }, { status: 409 });
        };

        // Verify entered OTP with the one in db.
        if (OTP != user.OTP) {
            return NextResponse.json({
                success: false,
                error: "OTP is incorrect. Focus, champ.",
            }, { status: 401 });
        };

        // Update OTP expiry time in db.
        const currentTime = new Date();
        if (user.OTPexpiry) {
            const remainingTime = (user.OTPexpiry.valueOf() - currentTime.valueOf()) / 1000;
            if (remainingTime <= 0) {
                return NextResponse.json({
                    success: false,
                    error: "Oopsies! OTP has expired.",
                });
            } else {
                user.OTPexpiry = new Date(); // This will ensure that the user can't enter the same OTP to login again
                await user.save();
            };
        };

        // Create and send sign-in token.
        const tokenData: SignInTokenData = { 
            id: user.id,
            isAdmin: user.isAdmin,
        };

        const signInToken = await generateToken(tokenData);
        const response = NextResponse.json({
            success: true,
            message: "Logged in successfully, dear.",
        }, { status: 200 });

        // Sending response.
        response.cookies.set("signInToken", signInToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
        });

        return response;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Oopsies! An unknown error has occured.";
        return NextResponse.json({
            success: false,
            error: errorMessage,
        }, { status: 500 });
    };
};