import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Merchandise from "@/models/Merchandise";
import mongoose from "mongoose";
import { NextApiRequest } from "next";
import { ObjectId } from 'mongodb';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id
    await connectDB();

    if(id){
      const objectId = new ObjectId(id);
    const merchandise = await Merchandise.findById(objectId)

    if (!merchandise) return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });

    return NextResponse.json({ success: true, merchandise });
    }else{
      return NextResponse.json({ success: false, error: "ID error" }, { status: 500 });

    }
    
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextApiRequest,
) {
  try {
    const { idQ }= req.query

    const id = Array.isArray(idQ) ? idQ[0] ?? "" : idQ ?? "";
    await connectDB();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
    }

    const body = await req.body;
    const { name, email, role } = body;

    const updatedMerchandise = await Merchandise.findByIdAndUpdate(
      id,
      { name, email, role },
      { new: true, runValidators: true }
    );

    if (!updatedMerchandise) {
      return NextResponse.json({ success: false, error: "Merchandise not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, merchandise: updatedMerchandise });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}


export async function DELETE(
    req: NextApiRequest,
  ) {
    await connectDB();

    try {
      const { idQ }= req.query

    const id = Array.isArray(idQ) ? idQ[0] ?? "" : idQ ?? "";
      const merchandiseId = id;
  
      const deletedMerchandise = await Merchandise.findByIdAndDelete(merchandiseId);
  
      if (!deletedMerchandise) {
        return NextResponse.json({ error: "Merchandise not found" }, { status: 404 });
      }
  
      return NextResponse.json({ success: true, message: "Merchandise deleted" });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }