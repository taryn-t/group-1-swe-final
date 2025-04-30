"use client"
import Alert from '@/components/Alerts/alert';
import EditCourseTextBook from '@/components/EditCourseTExtbooks';
import ManageCourses from '@/components/ManageCourses';
import OrderView from '@/components/orderview';
import { MerchandiseDocument } from '@/models/Merchandise';
import { OrderDocument } from '@/models/Order';
import { TextbookDocument } from '@/models/Textbook';
import mongoose from 'mongoose';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

export interface PopulatedSection {
  _id: string;
  id: string;
  number: string;
  textbook_link: string;
  course_id: string;
  user_id: string[]; // array of user IDs (as strings)
  course: {
    _id: string;
    id: string;
    name: string;
    subject_id: string;
  } | null; // course could be null if not found
}

export default function Page() {
    
  const [user, setUser] = useState<User>()
  const [orders, setOrders] = useState<Array<OrderDocument>>()
  const [saved, setSaved] = useState(false)
  const [alert, setAlert] = useState(false)
  const [manage, setManage] = useState<boolean>(false)
  const [courses, setCourses] = useState<any>()
  const [textbooks, setTextbooks] = useState<any>()
  const [addTextbooks, setAddTextbooks] = useState<boolean>(false)
  const [profileView, setProfileView] = useState<boolean>(false)
  const [ordersView, setOrdersView] = useState<boolean>(false)
  const { update } = useSession();
  const router = useRouter();
  const params = useParams<{ profile: string[] }>();
  const { data: session, status } = useSession();

  useEffect(()=>{  
     getUser()
    
    

  }, [user,params ])
  


async function getUser(){
    if(params.profile[0]){
        
        if(!user){
          const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users/${params.profile[0]}`, {
              cache: "no-store", // disables caching
          });

          const data = await res.json();

          if (!data.success) {
              router.replace('/')
          } else{
              setUser(data.user)
          }

        }
       
        if(params.profile[1] === "orders"){
          setOrdersView(true)
            const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/orders?user_id=${params.profile[0]}`, {
                cache: "no-store", // disables caching
            });
    
            const data = await res.json();
            console.log(data)
            if (!data.success) {
                router.replace(`/profile/$${params.profile[0]}`)
            } else{
              
                setOrders(data.orders)
                
            }
            return
          
        }
        else if(params.profile[1] === "manage-courses" && !manage && !params.profile[2]){
          setManage(true)
          const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/sections?user_id=${params.profile[0]}`, {
            cache: "no-store", // disables caching
            });

          const data = await res.json();
          

          if (!data.success) { router.replace(`/profile/$${params.profile[0]}`)}

          setCourses(data.sections)
          return
        }

        else if(params.profile[1] === "manage-courses" && params.profile[2] && !addTextbooks){
          setAddTextbooks(true)
          const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/textbooks/search?q=${params.profile[2]}`, {
            cache: "no-store", // disables caching
            });

          const data = await res.json();
          

          if (!data.success) { router.replace(`/profile/$${params.profile[0]}`)}
            
          setTextbooks(data.results)
          return
        }
        else{
            setProfileView(true)
        }
    
    }

 

  
}


async function handleSubmit(event: FormEvent<HTMLFormElement>) {

  event.preventDefault();
  console.log("submit")
  const formData = new FormData(event.currentTarget);

  if(params.profile[0]){
    const res =  await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users/${params.profile[0]}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          address: formData.get("address"),
          phone: formData.get("phone"),
          role: formData.get("role") === "on" ? "admin" : "user",
        })
      });
    
      const data = await res.json();
       console.log(data)
      if(data.success){
        await update();
        setSaved(true)
        setAlert(true)
      }
      else{
        setSaved(false)
        setAlert(true)
      }
      
  }
 

}

  if(manage){
    return(
      <ManageCourses data={courses} user={params.profile[0]}/>
    )

  }

  if(addTextbooks){
    return(
      <EditCourseTextBook section={params.profile[2]} data={textbooks} user={params.profile[0]}/>
    )

  }

    
  if(profileView){
  return (
      <div className="grid grid-flow-row items-start justify-items-center  gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)] w-full h-full  min-h-screen">
        <div className="flex flex-col gap-8  sm:items-start w-full"> 

     

        <div className="divide-y divide-gray-900/10 self-center pt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base/7 font-semibold text-gray-900">Edit Profile</h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Edit/View your information
            </p>
            {
          saved && alert ? (<Alert type="UploadSuccess" onClose={() => setAlert(false)}/>)
          : !saved && alert ?  (<Alert type="UploadFailure" onClose={() => setAlert(false)}/>) 
          : <></>
          }
        
          </div>

          <form className="bg-white ring-1 shadow-xs ring-gray-900/5 sm:rounded-xl md:col-span-2" onSubmit={handleSubmit}>
            <div className="px-4 py-6 sm:p-8 w-full">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                    Name
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-marshall-600">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder={user?.name|| ""}
                        defaultValue={user?.name|| ""}
                        className="block border rounded-md border-gray-400 min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                    Email
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-marshall-600">
                      <input
                        id="email"
                        name="email"
                        type="text"
                        placeholder={user?.email || ""}
                        defaultValue={user?.email || ""}
                        className="block min-w-0 border rounded-md border-gray-400  grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                    Address
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-marshall-600">
                      <input
                        id="address"
                        name="address"
                        type="text"
                        placeholder={user?.address || ""}
                        defaultValue={user?.address || ""}
                        className="block min-w-0 border rounded-md border-gray-400  grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                    Phone
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-marshall-600">
                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder={user?.phone || ""}
                        defaultValue={user?.phone || ""}
                        className="block min-w-0 border rounded-md border-gray-400  grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <button
                type="submit"
                className="rounded-md bg-marshall-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-marshall-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marshall-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>

        
      </div>
          
        </div>
      </div>
    );
  }
  if(ordersView){
    return(
      <div>
            <OrderView orders={orders} />
        </div>
    )
  }
 
}

