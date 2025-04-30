import { CourseDocument } from "@/models/Course"
import { DepartmentDocument } from "@/models/Department"
import { SectionDocument } from "@/models/Section"
import { useState } from "react"
import CourseSelect from "./CourseSelect"
import DeptSelect from "./DeptSelect"
import SectionSelect from "./SectionSelect"
import Alert from "./Alerts/alert"



interface Props{
    user: string
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function CourseModal({user, setShowModal}:Props){
 const [dept, setDept] = useState<DepartmentDocument | any>({})
    const [course, setCourse] = useState<CourseDocument | any>({})
    const [section, setSection] = useState<SectionDocument | any>({})

    const [saved, setSaved] = useState(false)
    const [alert, setAlert] = useState(false)

    
 

   async function addCourse(){
        const res =  await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/sections`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userId: user,
              sectionId: section.id,
            })
          });
        
          const data = await res.json();
          if(data.success){
            setSaved(true)
            setAlert(true)
            setShowModal(false)
          }
          else{
            setSaved(false)
            setAlert(false)
          }


    }

    return(
        <>
           {
                saved && alert ? (<Alert type="UploadSuccess" onClose={() => setAlert(false)}/>)
                : !saved && alert ?  (<Alert type="UploadFailure" onClose={() => setAlert(false)}/>) 
                : <></>
            }
          <div className="bg-white p-10 shadow-lg rounded-lg sm:rounded-lg z-60 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-80">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold text-gray-900">Add Course</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
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
        </div>
        <div className="mt-5">
          <button
            type="button"
            onClick={addCourse}
            className="inline-flex items-center rounded-md bg-marshall-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-marshall-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marshall-500"
          >
            Add
          </button>
        </div>
      </div>
    </div>
        
        </>
      
    )
  }