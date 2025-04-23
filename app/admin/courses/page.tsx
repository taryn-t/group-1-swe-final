"use client"

import Loading from '@/components/Loading';
import { CourseDocument } from '@/models/Course';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { useEffect, useState } from 'react';


export default function Page() {
    const [alert, setAlert] = useState(false)
    const [error, setError] = useState(false)
    const [courses, setCourses] = useState<Array<CourseDocument>>()
    const { data: session } = useSession();

    useEffect(()=>{  
        if(courses === undefined){
            getCourses()
        }
      
    }, [])
    
  
   
  async function getCourses(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/courses`, {
        cache: "no-store", // disables caching
      });

    const data = await res.json();

    if (data.success) {    
        setCourses(data.courses)
       
    }
    
    
  }

  const deleteUser = async (id: string) => {
    if(session?.user._id === id){
        return
    }
    const res = await fetch(`/api/courses/${id}`, {
      method: "DELETE",
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      setAlert(true)
      setError(true)
    } else {
      setAlert(true)
      setError(false)
    }
  };

  if(courses === undefined){
    return(
        <Loading/>
    )
  }

  return (
    <div className="grid grid-flow-row items-start justify-items-center min-h-screen h-full  gap-16 sm:p-6 font-[family-name:var(--font-geist-sans)]  ">
        <div className="flex flex-col gap-8  sm:items-start w-full"> 
        <div className="w-full ">
    
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6 w-full">
        <div className="-mt-2 -ml-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="mt-2 ml-4">
            <h3 className="text-base font-semibold text-gray-900">All Courses</h3>
          </div>
          {/* <div className="mt-2 ml-4 shrink-0">
            <button
              type="button"
              className="relative inline-flex items-center rounded-md bg-marshall-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-marshall-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marshall-600"
            >
              Add new
            </button>
          </div> */}
        </div>
      </div>
         <ul role="list" className="divide-y divide-gray-100 w-full  px-4 py-5 sm:px-6  overflow-y-scroll ">
        {courses?.map((course,i) => (
            <li key={course.id+i} className="flex items-center justify-between gap-x-6 py-5 ">
            <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                <p className="text-sm/6 font-semibold text-gray-900">{course.id}     -     {course.name}</p>
                {/* <p
                    className={classNames(
                    statuses[project.status],
                    'mt-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium whitespace-nowrap ring-1 ring-inset',
                    )}
                >
                    {project.status}
                </p> */}
                </div>
                {/* <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
                <p className="whitespace-nowrap">
                    Created on <time dateTime={project.createdTime}>{project.created}</time>
                </p>
                <svg viewBox="0 0 2 2" className="size-0.5 fill-current">
                    <circle r={1} cx={1} cy={1} />
                </svg>
                <p className="truncate">Created by {project.createdBy}</p>
                </div> */}
            </div>
            <div className="flex flex-none items-center gap-x-4">
                <Link
                href={`/admin/courses/${course._id}`}
                className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:block"
                >
                View course<span className="sr-only">, {course.name}</span>
                </Link>
                <Menu as="div" className="relative flex-none">
                <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">Open options</span>
                    <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
                </MenuButton>
                <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 ring-1 shadow-lg ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                    <MenuItem>
                    <button
                        onClick={()=>deleteUser(course.id)}
                        className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                    >
                        Delete<span className="sr-only">, {course.name}</span>
                    </button>
                    </MenuItem>
                </MenuItems>
                </Menu>
            </div>
            </li>
        ))}
        </ul>
    </div>
        </div>
    </div>
  );
}
