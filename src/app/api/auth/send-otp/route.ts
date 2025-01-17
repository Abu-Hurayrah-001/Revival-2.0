// IMPORTS
import { NextRequest, NextResponse } from "next/server";
import { connectPrimaryDb } from "@/libs/connectPrimaryDb.lib";
import User, { IUser } from "@/models/user/uer.model";
import { generateOTP } from "@/libs/generateOTP";
import { sendOTPSchema } from "@/schemas/auth/sendOTP/sendOTPschema";

// SEND OTP TO PHONE NUMBER
type sendOTPprerequisite = {
    phoneNumber: number;
};

connectPrimaryDb();

export async function POST(request: NextRequest) {
    try {
        const reqBody: sendOTPprerequisite = await request.json();
        const parsedData = sendOTPSchema.safeParse(reqBody);

        if (!parsedData.success) {
            return NextResponse.json({ error: parsedData.error.issues[0].message }, { status: 400 });
        };

        const { phoneNumber } = reqBody;
        let user = await User.findOne({ phoneNumber }) as IUser;

        if (!user) {
            user = await User.create({ phoneNumber });
        };

        const OTP = generateOTP();
        user.OTP = OTP;
        await user.save();
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}