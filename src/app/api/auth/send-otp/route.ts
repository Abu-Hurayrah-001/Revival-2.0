// IMPORTS
import { NextRequest, NextResponse } from "next/server";
import { connectPrimaryDb } from "@/libs/connectPrimaryDb.lib";
import User, { IUser } from "@/models/user/uer.model";
import { generateOTP } from "@/libs/generateOTP";

// SEND OTP TO PHONE NUMBER
const OTP = generateOTP();