// IMPORTS
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectPrimaryDb } from "@/libs/connectPrimaryDb.lib";
import User, { IUser } from "@/models/user/uer.model";

// SIGN UP
type signInData = {
    email: string;
    OTP: number;
};

connectPrimaryDb();

const signInSchema = z.object({
    email: z.string().email(),
    OTP: z
        .number()
        .refine((val: number) => val.toString().length === 4, {
            message: "OTP must have 4 digits."
        })
});

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const reqBody: signInData = await request.json();
        const parsedData = signInSchema.safeParse(reqBody);
        const currentTime = new Date();

        if (!parsedData.success) {
            return NextResponse.json({
                success: false,
                error: parsedData.error.issues[0].message
            }, { status: 400 });
        };

        const { email, OTP } = reqBody;
        const user = await User.findOne({ email }) as IUser;

        if (!user) {
            return NextResponse.json({
                success: false,
                error: "User doesn't exist. Gonna cry?"
            }, { status: 409 });
        };

        if (OTP != user.OTP) {
            return NextResponse.json({
                success: false,
                error: "OTP is incorrect. Focus, champ.",
            }, { status: 401 });
        };

        if (user.OTPexpiry) {
            const remainingTime = (user.OTPexpiry.valueOf() - currentTime.valueOf()) / 1000;
            
            if (remainingTime <= 0) {
                return NextResponse.json({
                    success: false,
                    error: "Too slow dude, request a new OTP please."
                });
            } else {
                // TODO: Decrease OTP expiry time by 45 seconds
            };
        };

        return NextResponse.json({
            success: true,
            message: "Logged in successfully, dear.",
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error,
        }, { status: 500 });
    };
};