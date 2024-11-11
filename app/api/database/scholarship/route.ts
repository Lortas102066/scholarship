import { NextResponse } from 'next/server';
import Scholarship from '@/models/Scholarship';
import dbConnect from '@/utils/database';

export async function GET() {
  await dbConnect();
  try {
    const scholarship = await Scholarship.find();
    return NextResponse.json(scholarship);
  } catch (error) {
    return NextResponse.json({ error: '奨学金の取得に失敗しました' }, { status: 500 });
  }
}