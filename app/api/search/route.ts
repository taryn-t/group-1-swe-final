import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Textbook from '@/models/Textbook';
import Merchandise from '@/models/Merchandise';

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const query = searchParams.get('q') || '';
  const role = searchParams.get('role') || '';

  if (!query) {
    return NextResponse.json({ success: false, error: 'Search query required' }, { status: 400 });
  }

  try {
    const orMerchandise = [
      { name: { $regex: query, $options: 'i' } },
      { category: { $regex: query, $options: 'i' } }
    ];

    const orTextbooks = [
      { name: { $regex: query, $options: 'i' } },
      { author: { $regex: query, $options: 'i' } },
      { publisher: { $regex: query, $options: 'i' } },
      { isbn: { $regex: query, $options: 'i' } },
      { edition: { $regex: query, $options: 'i' } }
    ];

    let textbooks = [];
    let merchandise = [];

    if (role.toLowerCase() === 'user' || role.toLowerCase() === 'marshall fan') {
      // 🔥 Restrict: Users/Fans only see Merchandise
      merchandise = await Merchandise.find({ $or: orMerchandise });
    } else {
      // 🔥 Admin/Staff: Full search (Textbooks + Merchandise)
      [textbooks, merchandise] = await Promise.all([
        Textbook.find({ $or: orTextbooks }),
        Merchandise.find({ $or: orMerchandise }),
      ]);
    }

    return NextResponse.json({
      success: true,
      textbooks,
      merchandise
    });

  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
