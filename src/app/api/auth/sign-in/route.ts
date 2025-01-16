// IMPORTS
import { NextRequest, NextResponse } from "next/server";
import { signInSchema } from "@/app/schemas/auth/signUp/signIn.schema";
import { connectPrimaryDb } from "@/libs/connectPrimaryDb.lib";
import User, { IUser } from "@/models/user/uer.model";

// SIGN UP
type signInData = {
    phoneNumber: number;
    OTP: number;
};

connectPrimaryDb();

export async function POST(request: NextRequest) {
    try {
        const reqBody: signInData = await request.json();
        const parsedData = signInSchema.safeParse(reqBody);

        if (!parsedData.success) {
            return NextResponse.json({ error: parsedData.error.issues[0].message }, { status: 400 });
        };

        const { phoneNumber, OTP } = reqBody;
        const user: IUser | null = await User.findOne({ phoneNumber });

        if (!user) {
            return NextResponse.json({ error: "User doesn't exist. Gonna cry?" }, { status: 409 })
        };
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    };
};