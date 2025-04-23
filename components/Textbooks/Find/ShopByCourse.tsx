import CourseSelect from "@/components/CourseSelect";
import DeptSelect from "@/components/DeptSelect";
import SectionSelect from "@/components/SectionSelect";
import { CourseDocument } from "@/models/Course";
import { DepartmentDocument } from "@/models/Department";
import { SectionDocument } from "@/models/Section";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function ShopByCourse(){
    const [dept, setDept] = useState<DepartmentDocument | any>({})
    const [course, setCourse] = useState<CourseDocument | any>({})
    const [section, setSection] = useState<SectionDocument | any>({})
    const [courses, setCourses] = useState()
    const router = useRouter()

    function handleSearch(){
        router.push(`/textbooks/${dept.id}/${course.id}/${section.id}`)
    }

    return(

        <>
        <div className="divide-y divide-gray-200 my-24 rounded-lg bg-white shadow-lg py-6 overflow-visible max-h-[550px]">
            <div className="px-4 py-5 sm:px-6">
                <h2 className="mx-auto max-w-3xl text-center text-3xl font-semibold tracking-tight sm:text-4xl">Shop by Course</h2>
            </div>
            <div className="px-4 py-5 sm:p-6 grid grid-flow-row  ">
                <DeptSelect selected={dept} setSelected={setDept}/>
                {
                    Object.getOwnPropertyNames(dept).length > 0
                    ? <CourseSelect selected={course} setSelected={setCourse} dept_id={dept.id}/>
                    : <></>
                }
                {
                    Object.getOwnPropertyNames(course).length > 0
                    ? <SectionSelect selected={section} setSelected={setSection} course_id={course.id}/>
                    : <></>
                }
                {
                    Object.getOwnPropertyNames(section).length > 0
                    ?  <button
                    onClick={handleSearch}
                        
                        className="flex w-full justify-center rounded-md bg-marshall-600 px-3  py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-marshall-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marshall-600"
                        >
                            Search
                        </button>
                    :<></>
                }
            </div>
        </div>
        
        </>
    )
}