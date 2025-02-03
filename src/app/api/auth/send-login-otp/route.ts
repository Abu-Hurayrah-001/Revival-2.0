// IMPORTS
import { NextRequest, NextResponse } from "next/server";
import { connectPrimaryDb } from "@/libs/connectPrimaryDb.lib";
import User, { IUser } from "@/models/user/uer.model";
import { generateOTP } from "@/libs/generateOTP";
import { z } from "zod";
import LoginOTPEmail from "@/emails/LoginOTPEmail";
import { Resend } from "resend";

// SEND OTP TO PHONE NUMBER (Get email from request > Validate it > Find user from email > Save OTP and OTPexpiry in user's db > Mail OTP)
type SendLoginOTPData = { email: string };
connectPrimaryDb();
const sendLoginOTPSchema = z.object({ email: z.string().email() });
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const reqBody: SendLoginOTPData = await request.json();
        const parsedData = sendLoginOTPSchema.safeParse(reqBody);

        if (!parsedData.success) {
            return NextResponse.json({
                success: false,
                error: parsedData.error.issues[0].message
            }, { status: 400 });
        };

        const { email } = reqBody;
        let user = await User.findOne({ email }) as IUser;

        if (!user) {
            user = await User.create({ email });
        };

        const OTP = generateOTP();
        const OTPexpiry = new Date();
        OTPexpiry.setSeconds(OTPexpiry.getSeconds() + 45);
        user.OTP = OTP;
        user.OTPexpiry = OTPexpiry;
        await user.save();
        
        const { error } = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Login OTP",
            react: LoginOTPEmail(OTP),
        });

        if (error) {
            return NextResponse.json({
                success: false,
                error: error.message,
            }, { status: 500 });
        };

        return NextResponse.json({
            success: true,
            message: "OTP sent to your email, dear.",
        }, { status: 201 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Oopsies! An unknown error has occured.";
        return NextResponse.json({
            success: false,
            error: errorMessage,
        }, { status: 500 });
    };
};