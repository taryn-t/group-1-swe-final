
import { useState } from "react"
import CourseModal from "./CourseModal"
import Loading from "./Loading";
import Link from "next/link";
import { TextbookDocument } from "@/models/Textbook";
import AddTextbookModal from "./AddTextbookModal";



interface Props{
    data: TextbookDocument[];
    user: string
    section: string
}

export default function EditCourseTextBook({data, user, section}:Props) {
    const [showModal, setShowModal] = useState(false)

    if(data === undefined){
        return <Loading/>
    }
  
    return (
        <>

      <div className="px-4 sm:px-6 lg:px-8 min-h-screen pt-32 max-w-7xl mx-auto relative">
       
         {
            showModal ? <AddTextbookModal section={section} user={user} setShowModal={setShowModal} /> : <></>
         }       
        
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">Course Books</h1>
            <p className="mt-2 text-sm text-gray-700">
              
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={()=>setShowModal(true)}
              className="block rounded-md bg-marshall-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-marshall-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marshall-600"
            >
              Add Textbook
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      ISBN
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Edition
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Author
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Publisher
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Price
                    </th>
                    {/* <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
                      <span className="sr-only">Edit</span>
                    </th> */}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((book ) => (
                    <tr key={book._id}>
                      <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                        {book?.isbn}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{book?.name}</td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{book?.edition}</td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{book?.author}</td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{book?.publisher}</td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{book?.price}</td>
                      {/* <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                        <Link href={`/profile/${user}/manage-courses/${section.id}`} className="text-marshall-600 hover:text-marshall-900">
                          Edit Textbooks
                        </Link>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
    )
  }


