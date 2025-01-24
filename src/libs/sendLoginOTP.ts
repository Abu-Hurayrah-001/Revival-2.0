// IMPORTS
import { NextResponse } from "next/server";
import { Resend } from "resend";
import LoginOTPEmail from "@/emails/LoginOTPEmail";

// SEND OTP
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLoginOTP(email: string, OTP: number) {
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Login OTP",
            react: LoginOTPEmail(OTP),
        });

        return NextResponse.json({
            success: true,
            message: "OTP sent to your email, boss.",
        }, {status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });      
    };
};