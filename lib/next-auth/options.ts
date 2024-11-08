import { NextAuthOptions } from "next-auth";
import GitHubProviders from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./db";

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
    adapter: MongoDBAdapter(client),
    callbacks: {
        session: ({session, user}) => { 
        return {
            ...session,
            user: {
                ...session.user,
                id: user.id,
            },
        };
    }
    },
    secret: process.env.NEXTAUTH_SECRET,
};