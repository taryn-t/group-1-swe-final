// app/api/users/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose"; // make sure this connects to your DB
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const users = await User.find().select("-password"); // exclude password field

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 });
  }
}
