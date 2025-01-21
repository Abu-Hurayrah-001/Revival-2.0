// IMPORTS
import { NextResponse } from "next/server";
import twilio from "twilio";

// SEND OTP
export async function sendOTP(phoneNumber: number, OTP: number) {
    try {
        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

        client.messages
            .create({
                body: OTP + " is your verification code for Ratbusters.in",
                from: "+917992365891",
                to: `+91${phoneNumber}`,
            })
            .catch((error) => {
                return NextResponse.json({ error: error }, { status: 500 });
            });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });      
    };
};