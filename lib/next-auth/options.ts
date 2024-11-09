import { NextAuthOptions } from "next-auth";
import GitHubProviders from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import connectDB from "@/utils/database";

export const nextAuthOptions: NextAuthOptions = {
    debug: true,
    providers: [
        GitHubProviders({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async session({session}) { 
            if (session.user) {
                await User.findOne({ email: session.user.email });
            }
        return session;
    },
    async signIn({ user }) {
        try {
            await connectDB();
            const userExists = await User.findOne({ email: user.email });
            if (!userExists) {
                await new User({
                    name: user.name,
                    email: user.email,
                }).save();
                return "/user-register";
            }
            return true;
        } 
        catch (error) {
            console.log(error);
            return false;
        }
    },
    },
    secret: process.env.NEXTAUTH_SECRET,
};