// IMPORTS
import { NextResponse } from "next/server";
import { Resend } from "resend";
import LoginOTPEmail from "@/emails/LoginOTPEmail";

// SEND OTP
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLoginOTP(email: string, OTP: number) {
    try {
        
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });      
    };
};