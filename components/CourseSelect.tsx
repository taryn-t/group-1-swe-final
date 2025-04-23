import { useEffect, useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import { CourseDocument } from '@/models/Course'
import Loading from './Loading'


interface Props{
   selected: CourseDocument | any
   setSelected: ({}:CourseDocument | any) => void;
   dept_id: string
}

export default function CourseSelect({selected, setSelected,dept_id}:Props) {
  const [options, setOptions] = useState<Array<CourseDocument>>()


    useEffect(()=>{  
          if(options === undefined){
             getCourses()

          }
          else if(Object.getOwnPropertyNames(selected).length === 0){
            setSelected(options[0])
          }
        
      }, [])
      
    
     
    async function getCourses(){
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/courses/department?subject_id=${dept_id}`, {
          cache: "no-store", // disables caching
        });
  
      const data = await res.json();
  
      if (data.success) {    
          setOptions(data.courses)
          
      }
      
      
    }
    if(options === undefined) return (<Loading/>)

  return (
    <Listbox value={selected} onChange={setSelected}>
      <Label className="block text-sm/6 font-medium text-gray-900 mt-4 ">Course</Label>
      <div className="relative ">
      <ListboxButton className="border border-gray-200 grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-marshall-600 sm:text-sm/6">
          <span className="col-start-1 row-start-1 truncate pr-6">{selected?.id}</span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {options.map((option) => (
            <ListboxOption
              key={option?.id}
              value={option}
              className="group relative cursor-default py-2 pr-4 pl-8 text-gray-900 select-none data-focus:bg-marshall-600 data-focus:text-white data-focus:outline-hidden"
            >
              <span className="block truncate font-normal group-data-selected:font-semibold">{option?.id}</span>

              <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-marshall-600 group-not-data-selected:hidden group-data-focus:text-white">
                {
                  selected?.name === option.name ? (<CheckIcon aria-hidden="true" className="size-5" />): <></>
                }
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}