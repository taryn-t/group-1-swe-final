import { NextResponse } from "next/server";
import { sendMessage } from "@/lib/mailer";

export async function POST(req: Request) {
  const { email, name, phone, message } = await req.json();

  try {
    await sendMessage(email, name, phone, message);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Email sending failed" }, { status: 500 });
  }
}