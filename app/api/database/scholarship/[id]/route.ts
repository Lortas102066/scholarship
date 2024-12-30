// app/api/database/scholarship/[id]/route.ts
import { NextResponse } from "next/server";
import Scholarship from "@/models/scholarship";
import dbConnect from "@/utils/database";

interface Params {
  id: string;
}

export async function GET(
  request: Request,
  { params }: { params: Params }  // ★ App Routerでのパラメータの取得方法
) {
  const { id } = params; // URLパラメータ
  console.log("id:", id);
  await dbConnect();

  try {
    const scholarship = await Scholarship.findById(id);
    
    if (!scholarship) {
      return NextResponse.json({ message: "Scholarship not found" }, { status: 404 });
    }

    return NextResponse.json(scholarship, { status: 200 });
  } catch (error) {
    console.error("Error fetching scholarship:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
