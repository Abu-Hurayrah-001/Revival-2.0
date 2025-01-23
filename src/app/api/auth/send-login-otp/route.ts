// IMPORTS
import { NextRequest, NextResponse } from "next/server";
import { connectPrimaryDb } from "@/libs/connectPrimaryDb.lib";
import User, { IUser } from "@/models/user/uer.model";
import { generateOTP } from "@/libs/generateOTP";
import { sendOTPSchema } from "@/schemas/auth/sendLoginOTP/sendOTPschema";

// SEND OTP TO PHONE NUMBER
type sendOTPprerequisite = {
    email: string;
};

connectPrimaryDb();

export async function POST(request: NextRequest) {
    try {
        const reqBody: sendOTPprerequisite = await request.json();
        const parsedData = sendOTPSchema.safeParse(reqBody);

        if (!parsedData.success) {
            return NextResponse.json({ error: parsedData.error.issues[0].message }, { status: 400 });
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
        
        return NextResponse.json({ message: "OTP sent to your email dear." }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    };
}