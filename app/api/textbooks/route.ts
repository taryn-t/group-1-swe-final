import { NextRequest, NextResponse } from 'next/server';
import Textbook from '@/models/Textbook';
import { connectDB } from '@/lib/mongoose';

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '12', 10);
  const skip = (page - 1) * limit;

  try {
    const [textbooks, totalItems] = await Promise.all([
      Textbook.find().skip(skip).limit(limit),
      Textbook.countDocuments()
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return NextResponse.json({
      success: true,
      results: textbooks,
      page,
      perPage: limit,
      totalPages,
      totalItems
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching textbooks', error }, { status: 500 });
  }
}