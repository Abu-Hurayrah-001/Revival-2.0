// IMPORTS
import NextAuth, { AuthOptions } from "next-auth";
import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";

// AUTH HANDLER
export const authOptions: AuthOptions = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        Discord({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
        }),
    ],
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };