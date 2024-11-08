// app/api/mongodb/user/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('scholarship');
    const users = await db
      .collection('User')
      .find({})
      .sort({ age: -1 })
      .limit(10)
      .toArray();

    return NextResponse.json(users);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
