import { NextRequest, NextResponse } from 'next/server';
import Merchandise from '@/models/Merchandise';
import { connectDB } from '@/lib/mongoose';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {


  await connectDB();
 const db = mongoose.connection.db;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');  

  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '12', 10);
  const skip = (page - 1) * limit;

  try {
   

    if (id) {
      let merchandise;
      if (/^[0-9a-fA-F]{24}$/.test(id)) {
        // Looks like a real ObjectId
        merchandise = await Merchandise.findById(new ObjectId(id));
      } else {
        // Probably a string _id
        merchandise = await Merchandise.findById(id);
      }

      if (!merchandise) {
        return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true, merchandise });
    }

    const [merchandise, totalItems] = await Promise.all([
      Merchandise.find().skip(skip).limit(limit),
      Merchandise.countDocuments()
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return NextResponse.json({
      success: true,
      results: merchandise,
      page,
      perPage: limit,
      totalPages,
      totalItems
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching merchandise', error }, { status: 500 });
  }
}