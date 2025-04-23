import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Course from '@/models/Course';
import Section from '@/models/Section';
import Textbook from '@/models/Textbook';

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const department = searchParams.get('department'); // e.g., "ACC"

  try {
    if (!department) {
      return NextResponse.json({ message: 'Missing department parameter' }, { status: 400 });
    }

    // Step 1: Get course IDs by department
    const courses = await Course.find({ subject_id: department });
    const courseIds = courses.map(course => course.id);

    if (courseIds.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // Step 2: Get section IDs by course
    const sections = await Section.find({ course_id: { $in: courseIds } });
    const sectionIds = sections.map(section => section.id);

    if (sectionIds.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // Step 3: Get textbooks by section
    const textbooks = await Textbook.find({ section_id: { $in: sectionIds } });

    return NextResponse.json(textbooks);
  } catch (error) {
    return NextResponse.json({ message: 'Error filtering by department', error }, { status: 500 });
  }
}