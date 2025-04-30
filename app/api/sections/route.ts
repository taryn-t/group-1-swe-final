import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Section from '@/models/Section';
import mongoose from 'mongoose';
import Course from '@/models/Course';
export const runtime = 'edge';
export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get('course_id');

  const userId = searchParams.get('user_id');
  try {
    if(courseId){
      const sections = await Section.find({ course_id: courseId });
      return NextResponse.json({ success: true, sections:sections });
    }
    else if(!userId){
      const sections = await Section.find({ });
      return NextResponse.json({ success: true, sections:sections });
    }
    
    if (userId) {
      const objectId = new mongoose.Types.ObjectId(userId);
    
      // 🔥 Find sections where user_id array CONTAINS the user ID
      const sections = await Section.find({ user_id: { $in: [objectId] } });
    
      // Populate course data manually
      const populatedSections = await Promise.all(sections.map(async (section) => {
        const course = await Course.findOne({ id: section.course_id });
        return {
          ...section.toObject(),
          course: course || null,
        };
      }));
    
      return NextResponse.json({ success: true, sections: populatedSections });
    }
    
    
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching sections', error }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  await connectDB();

  try {
    const { userId, sectionId } = await req.json();
    console.log(userId)
    if (!userId || !sectionId) {
      return NextResponse.json({ success: false, error: 'userId and sectionId are required' }, { status: 400 });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const updatedSection = await Section.findOneAndUpdate(
      { id: sectionId }, // assuming `id` field is used for your section lookup (not _id)
      { $addToSet: { user_id: userObjectId } }, // ✅ $addToSet prevents duplicates
      { new: true } // return the updated document
    );

    if (!updatedSection) {
      return NextResponse.json({ success: false, error: 'Section not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, section: updatedSection });

  } catch (error) {
    console.error('Error updating section:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}