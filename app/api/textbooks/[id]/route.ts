import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Textbook from "@/models/Textbook";
import mongoose from "mongoose";


export const runtime = 'edge';
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id
    await connectDB();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
    }

    const textbook = await Textbook.findById(id);
    if (!textbook) return NextResponse.json({ success: false, error: "Textbook not found" }, { status: 404 });

    return NextResponse.json({ success: true, textbook });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id
    await connectDB();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
    }

    const body = await req.json();
    const { name, email, role } = body;

    const updatedTextbook = await Textbook.findByIdAndUpdate(
      id,
      { name, email, role },
      { new: true, runValidators: true }
    );

    if (!updatedTextbook) {
      return NextResponse.json({ success: false, error: "Textbook not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, textbook: updatedTextbook });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}


export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    await connectDB();

    try {
      const id = (await params).id
      const textbookId = id;
  
      const deletedTextbook = await Textbook.findByIdAndDelete(textbookId);
  
      if (!deletedTextbook) {
        return NextResponse.json({ error: "Textbook not found" }, { status: 404 });
      }
  
      return NextResponse.json({ success: true, message: "Textbook deleted" });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }