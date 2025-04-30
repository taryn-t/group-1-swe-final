import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Textbook from '@/models/Textbook';
import Course from '@/models/Course';
import Section from '@/models/Section';
import Department from '@/models/Department';

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const q = searchParams.get('q');
  const department = searchParams.get('department');
  const courseId = searchParams.get('course');
  const sectionId = searchParams.get('section');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  const skip = (page - 1) * limit;
  let sectionFilterIds: string[] = [];

  try {
    // STEP 1: Get relevant section IDs (if filters exist)
    if (department || courseId && !sectionId) {
      const courseQuery: any = {};
      if (department) courseQuery.subject_id = department;
      if (courseId) courseQuery.id = courseId;

      const courses = await Course.find(courseQuery);
      const courseIds = courses.map(course => course.id);

      const sections = await Section.find({ course_id: { $in: courseIds } });
      sectionFilterIds = sections.map(section => section.id);
    }
   

    // STEP 2: Build search query
    const searchQuery: any = {};

    if (sectionId) {
      searchQuery.section_id = sectionId;
    }

    if (q) {
      const orQuery: any[] = [
        { name: { $regex: q, $options: 'i' } },
        { author: { $regex: q, $options: 'i' } },
        { isbn: { $regex: q, $options: 'i' } },
        { publisher: { $regex: q, $options: 'i' } },
        { edition: { $regex: q, $options: 'i' } },
        { section_id: { $regex: q, $options: 'i' } },
      ];
    
      // If q looks like an ObjectId
      if (/^[0-9a-fA-F]{24}$/.test(q)) {
        orQuery.push({ _id: q });
      }
    
      // 🔥 Walk Department -> Course -> Section -> Textbook
      const matchedDepartments = await Department.find({ name: { $regex: q, $options: 'i' } });
    
      const departmentIds = matchedDepartments.map(dep => dep.subject_id);
    
      if (departmentIds.length > 0) {
        const matchedCourses = await Course.find({ subject_id: { $in: departmentIds } });
        const courseIds = matchedCourses.map(course => course.id);
    
        if (courseIds.length > 0) {
          const matchedSections = await Section.find({ course_id: { $in: courseIds } });
          const sectionIds = matchedSections.map(section => section.id);
    
          if (sectionIds.length > 0) {
            orQuery.push({ section_id: { $in: sectionIds } });
          }
        }
      }
    
      if (Object.keys(searchQuery).length > 0) {
        searchQuery.$and = [searchQuery, { $or: orQuery }];
        delete searchQuery.section_id;
      } else {
        searchQuery.$or = orQuery;
      }
    }

    // STEP 3: Apply section filters from department/course selection
    if (sectionFilterIds.length > 0) {
      if (searchQuery.$and) {
        searchQuery.$and.push({ section_id: { $in: sectionFilterIds } });
      } else if (searchQuery.$or) {
        searchQuery.$and = [{ $or: searchQuery.$or }, { section_id: { $in: sectionFilterIds } }];
        delete searchQuery.$or;
      } else {
        searchQuery.section_id = { $in: sectionFilterIds };
      }
    }

    // STEP 4: Execute paginated query
    const [results, total] = await Promise.all([
      Textbook.find(searchQuery).skip(skip).limit(limit),
      Textbook.countDocuments(searchQuery),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      results,
      page,
      perPage: limit,
      totalPages,
      totalItems: total
    });

  } catch (error) {
    console.error("Search Error:", error);
    return NextResponse.json({ message: 'Search/filter error', error }, { status: 500 });
  }
}

export const runtime = 'edge';