import { NextResponse } from 'next/server';
import Scholarship from '@/models/scholarship';
import dbConnect from '@/utils/database';

export async function GET() {
  await dbConnect();
  try {
    const scholarship = await Scholarship.find();
    return NextResponse.json(scholarship);
  } catch (error) {
    return NextResponse.json(error);
  }
}