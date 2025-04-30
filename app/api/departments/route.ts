import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    const collection = db?.collection("departments");
    const allDepartments = await collection?.find({}).toArray();
    console.log(allDepartments)
    return NextResponse.json({ success: true, departments: allDepartments });
  } catch (error) {
    console.error("Failed to fetch department:", error);
    return NextResponse.json({ success: false, error: "Could not fetch department" }, { status: 500 });
  }
}
export const runtime = 'edge';