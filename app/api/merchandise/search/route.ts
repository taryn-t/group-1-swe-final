import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Merchandise from '@/models/Merchandise';
import { ObjectId } from 'mongodb';



export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const q = searchParams.get('q');  
  const id = searchParams.get('id');  
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  const skip = (page - 1) * limit;
  let sectionFilterIds: string[] = [];

  try {
    if(id){
      const objectID = new ObjectId(id);
      

      const merchandise = await Merchandise.findById(objectID);
      console.log(merchandise)
      if (!merchandise) return NextResponse.json({ success: false, error: "Merchandise not found" }, { status: 404 });
      
      return NextResponse.json({ success: true, merchandise });
    }

    if (q) {
      
        const orQuery: any[] = [
            { name: { $regex: q, $options: 'i' } },
            { category: { $regex: q, $options: 'i' } },
        ];
        
        // Try matching _id directly
        if (/^[0-9a-fA-F]{24}$/.test(q)) {
            orQuery.push({ _id: q });
        }


        const [results, total] = await Promise.all([
          Merchandise.find({ $or: orQuery }).skip(skip).limit(limit),
          Merchandise.countDocuments({ $or: orQuery }),
        ]);

        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({
        success: true,
        results: results,
        page,
        perPage: limit,
        totalPages,
        totalItems:total
        });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Search/filter error', error }, { status: 500 });
  }
}
