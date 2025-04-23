"use client"
import Loading from '@/components/Loading';
import { PaginatedTextbookResponse, TextbookDocument } from '@/models/Textbook';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react';


export default function Page() {
    const [textbooks, setTextbooks] = useState<PaginatedTextbookResponse>()
    const [page, setPage] = useState(1);

    useEffect(()=>{  
        if(textbooks === undefined){
            getTextbooks()
        }
      
    }, [])
    
  
   
  async function getTextbooks<Textbook>(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/textbooks?page=${page}`, {
        cache: "no-store", // disables caching
      });

    const data = await res.json();
    console.log(data.success)
    if (data.success) {    
        setTextbooks(data.results)
       
    }
    
                       
    
  }

  const deleteTextbook = async (id: string) => {
   
    const res = await fetch(`/api/textbooks/${id}`, {
      method: "DELETE",
    });
  
    const data = await res.json();
  
  //   if (!res.ok) {
  //     setAlert(true)
  //     setError(true)
  //   } else {
  //     setAlert(true)
  //     setError(false)
  //   }
  }

  if(textbooks === undefined){
    return(
        <Loading/>
    )
  }

  
  return (
    <div className="grid grid-flow-row items-start justify-items-center min-h-screen h-full  gap-16 sm:p-6 font-[family-name:var(--font-geist-sans)]  overflow-y-scroll  ">
        <div className="flex flex-col gap-8  sm:items-start w-full"> 
        <div className="w-full ">
    
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6 w-full">
        <div className="-mt-2 -ml-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="mt-2 ml-4">
            <h3 className="text-base font-semibold text-gray-900">All textbooks</h3>
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
         <ul role="list" className="divide-y divide-gray-100 w-full  px-4 py-5 sm:px-6">
        {textbooks?.results.map((textbook) => (
            <li key={textbook._id} className="flex items-center justify-between gap-x-6 py-5 overflow-visible ">
            <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                <p className="text-sm/6 font-semibold text-gray-900">{textbook.name}</p>
                <p
                    className={'mt-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium whitespace-nowrap ring-1 ring-inset'}
                >
                   ISBN: {textbook?.isbn}
                </p>
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
                href={`/admin/textbooks/${textbook._id}`}
                className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:block"
                >
                Edit textbook<span className="sr-only">, {textbook.name}</span>
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
                        onClick={()=>deleteTextbook(textbook._id)}
                        className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                    >
                        Delete<span className="sr-only">, {textbook.name}</span>
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

