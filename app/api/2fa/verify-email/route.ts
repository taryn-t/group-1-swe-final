import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return new Response(JSON.stringify({ success: false, message: "Missing token" }), {
      status: 400,
    });
  }

  const user = await User.findOne({ emailToken: token });

  if (!user) {
    return new Response(JSON.stringify({ success: false, message: "Invalid token" }), {
      status: 400,
    });
  }

  user.verified = true;
  user.emailToken = undefined;
  await user.save();

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}