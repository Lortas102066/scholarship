import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { nextAuthOptions } from "@/lib/next-auth/options";
import dbConnect from '@/utils/database';
import User from '@/models/user';

export async function POST(request: Request) {
    const session = await getServerSession(nextAuthOptions);
    
    if (!session) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    try {
        const data = await request.json();
        await dbConnect();
        const updatedUser = await User.findOneAndUpdate(
            { email: session.user!.email },
            { $set: data },
            { new: true }
          );
        return NextResponse.json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
