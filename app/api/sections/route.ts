import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Section from '@/models/Section';

export async function GET(req: NextRequest) {
  await connectDB();

  const courseId = req.nextUrl.searchParams.get('course_id');

  try {
    const query = courseId ? { course_id: courseId } : {};
    const sections = await Section.find(query);
    
    return NextResponse.json({ success: true, sections:sections });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching sections', error }, { status: 500 });
  }
}