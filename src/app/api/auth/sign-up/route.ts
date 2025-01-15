// IMPORTS
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { signUpSchema } from "@/app/schemas/auth/signUp/signUp.schema";
import { connectPrimaryDb } from "@/libs/connectPrimaryDb.lib";
import User, { IUser } from "@/models/user/uer.model";

// SIGN UP
type signUpData = {
    email: string;
    password: string;
};

connectPrimaryDb();

export async function POST(request: NextRequest) {
    try {
        const reqBody: signUpData = await request.json();
        const parsedData = signUpSchema.safeParse(reqBody);

        if (!parsedData.success) {
            return NextResponse.json({ error: parsedData.error.issues[0].message }, { status: 400 });
        };

        const { email, password } = reqBody;
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: "User already exists buddy." }, { status: 409 })
        };

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser: IUser = new User({
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return NextResponse.json({ message: "User created successfully." }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    };
};