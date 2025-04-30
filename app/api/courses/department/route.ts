
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Course from '@/models/Course';

export async function GET(req: NextRequest) {
  await connectDB();

  const subjectId = req.nextUrl.searchParams.get('subject_id');

  if (!subjectId) {
    return NextResponse.json({ message: 'Missing subject_id parameter' }, { status: 400 });
  }

  try {
    const courses = await Course.find({ subject_id: subjectId });
    return NextResponse.json({ success: true, courses: courses });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching courses', error }, { status: 500 });
  }
}
export const runtime = 'edge';