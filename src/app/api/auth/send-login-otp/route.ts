// IMPORTS
import { NextRequest, NextResponse } from "next/server";
import { connectPrimaryDb } from "@/libs/connectPrimaryDb.lib";
import User, { IUser } from "@/models/user/uer.model";
import { generateOTP } from "@/libs/generateOTP";
import { z } from "zod";
import { sendLoginOTP } from "@/libs/sendLoginOTP";

// SEND OTP TO PHONE NUMBER
type sendLoginOTPprerequisite = {
    email: string;
};

const sendLoginOTPSchema = z.object({ email: z.string().email() });
connectPrimaryDb();

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const reqBody: sendLoginOTPprerequisite = await request.json();
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
        
        const emailResponse = await sendLoginOTP(email, OTP);

        if (emailResponse.status === 200) {
            
        };

        return NextResponse.json({
            success: true,
            message: "OTP sent to your email, dear."
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error
        }, { status: 500 });
    };
}