import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Course, { CourseDocument } from "@/models/Course";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    const collection = db?.collection("courses");
    const allCourses = await collection?.find({}).toArray();
    console.log(allCourses)
    return NextResponse.json({ success: true, courses: allCourses });
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return NextResponse.json({ success: false, error: "Could not fetch courses" }, { status: 500 });
  }
}
