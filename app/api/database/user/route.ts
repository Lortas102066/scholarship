import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";
import dbConnect from '@/utils/database';
import User from '@/models/user';

export async function POST() {
    const session = await getServerSession(nextAuthOptions);
    if (!session) {
        return NextResponse.json({ redirect: "/api/auth/signin" });
    }
    await dbConnect();
    const user = await User.findOne({ email: session.user!.email });
    if (!user) {
        return NextResponse.json({ redirect: "/api/auth/signin" });
    } 

    if (user.isPersonalInfoFilled === false) {
        return NextResponse.json({ redirect: "/fill-info" });
    }
    return NextResponse.json({ redirect: "/personal-scholarship" });
}
