import { CourseDocument } from "@/models/Course"
import { DepartmentDocument } from "@/models/Department"
import { SectionDocument } from "@/models/Section"
import { FormEvent, useState } from "react"
import CourseSelect from "./CourseSelect"
import DeptSelect from "./DeptSelect"
import SectionSelect from "./SectionSelect"
import Alert from "./Alerts/alert"



interface Props{
    user: string
    section: string
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function AddTextbookModal({user, setShowModal, section}:Props){

    const [saved, setSaved] = useState(false)
    const [alert, setAlert] = useState(false)

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    
      event.preventDefault();
    
      const formData = new FormData(event.currentTarget);

      const book = {
    
        isbn:`${formData.get('isbn')}`,
        name:`${formData.get('name')}`,
        edition:`${formData.get('edition')}`,
        price:`${formData.get('price')}`,
        author:`${formData.get('author')}`,
        publisher:`${formData.get('publisher')}`,
        section_id: section,
        instock:true,
        stock: 100,

      }
      
      const res =  await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/textbooks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    })
      const data = await res.json();
    
      if(data.success){
        setSaved(true)
        setAlert(true)
        setShowModal(false)
      }
      else{
        setSaved(false)
        setAlert(true)
      }
      
    
    }
 


    return(
        <>
           {
                saved && alert ? (<Alert type="UploadSuccess" onClose={() => setAlert(false)}/>)
                : !saved && alert ?  (<Alert type="UploadFailure" onClose={() => setAlert(false)}/>) 
                : <></>
            }
          <div className="bg-white p-10 shadow-lg rounded-lg z-60 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-80">
          <h3 className="text-base font-semibold text-gray-900">Add Book</h3>
      <form className="px-4 py-5 sm:p-6 grid grid-cols-2 grid-flow-row gap-2" onSubmit={handleSubmit}>
        
            <div className="grid grid-cols-1 gap-1">
              <div>
                    <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                    ISBN
                    </label>
                    <div className="mt-2">
                        <input
                            id="isbn"
                            name="isbn"
                            type="text"
                            required
                            className="block w-full border border-gray-400 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-marshall-600 sm:text-sm/6"
                        />
                    </div>
                </div>
              
            </div>
            <div className="grid grid-cols-1 gap-1">
              <div>
                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                  Title
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block w-full border border-gray-400 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-marshall-600 sm:text-sm/6"
                  />
                </div>
              </div>
              
            </div>
            <div className="grid grid-cols-1 gap-1">
              <div>
                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                  Edition
                </label>
                <div className="mt-2">
                  <input
                    id="edition"
                    name="edition"
                    type="text"
                    required
                    className="block w-full border border-gray-400 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-marshall-600 sm:text-sm/6"
                  />
                </div>
              </div>
              
            </div>
            <div className="grid grid-cols-1 gap-1">
              <div>
                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                  Price
                </label>
                <div className="mt-2">
                  <input
                    id="price"
                    name="price"
                    type="text"
                    required
                    className="block w-full border border-gray-400 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-marshall-600 sm:text-sm/6"
                  />
                </div>
              </div>
              
            </div>
            <div className="grid grid-cols-1 gap-1">
              <div>
                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                  Author
                </label>
                <div className="mt-2">
                  <input
                    id="author"
                    name="author"
                    type="text"
                    required
                    className="block w-full border border-gray-400 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-marshall-600 sm:text-sm/6"
                  />
                </div>
              </div>
              
            </div>
            <div className="grid grid-cols-1 gap-1">
              <div>
                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                  Publisher
                </label>
                <div className="mt-2">
                  <input
                    id="publisher"
                    name="publisher"
                    type="text"
                    required
                    className="block w-full border border-gray-400 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-marshall-600 sm:text-sm/6"
                  />
                </div>
              </div>
              
            </div>
            <div className="mt-5">
                <button
                    type="submit"

                    className="inline-flex items-center rounded-md bg-marshall-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-marshall-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marshall-500"
                >
                    Add
                </button>
            </div>
      </form>
    </div>
        
        </>
      
    )
  }