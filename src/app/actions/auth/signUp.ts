// IMPORTS+
"use server";
import { connectPrimaryDb } from "@/libs/connectPrimaryDb";

// SIGN UP
export async function signUp() {
    connectPrimaryDb();
    console.log("My first server action on my own. Money, here I come!!");
};