"use client"
import Alert from '@/components/Alerts/alert';
import { User } from 'next-auth';
import { useParams, useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

export const runtime = 'edge';

export default function Page() {

  const [user, setUser] = useState<User>()
  const [saved, setSaved] = useState(false)
  const [alert, setAlert] = useState(false)
  const router = useRouter();
  const params = useParams<{id:string}>();

  useEffect(()=>{  
    if(user === undefined){
      getUser()
    }
    
  }, [])
  

 
async function getUser<User>(){
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users/${params.id}`, {
    cache: "no-store", // disables caching
  });
  const data = await res.json();

  if (!data.success) {
    router.replace('/admin/users')
  } else{
    setUser(data.user)
  }
  
  
}


async function handleSubmit(event: FormEvent<HTMLFormElement>) {

  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  
 const res =  await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users/${params.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: formData.get("name"),
      email: formData.get("email"),
      role: formData.get("role") === "on" ? "admin" : "user",
    })
  });

  const data = await res.json();

  if(data.success){
    setSaved(true)
    setAlert(true)
  }
  else{
    setSaved(false)
    setAlert(true)
  }
  

}

 
  if(user !== null || user !== undefined || user){
  return (
      <div className="grid grid-flow-row items-start justify-items-center min-h-screen  gap-16 sm:p-6 font-[family-name:var(--font-geist-sans)] overflow-y-scroll">
        <div className="flex flex-col gap-8  sm:items-start w-full"> 

        {
          saved && alert ? (<Alert type="UploadSuccess" onClose={() => setAlert(false)}/>)
          : !saved && alert ?  (<Alert type="UploadFailure" onClose={() => setAlert(false)}/>) 
          : <></>
        }
        

        <div className="divide-y divide-gray-900/10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base/7 font-semibold text-gray-900">Edit user</h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Edit user information
            </p>
          </div>

          <form className="bg-white ring-1 shadow-xs ring-gray-900/5 sm:rounded-xl md:col-span-2" onSubmit={handleSubmit}>
            <div className="px-4 py-6 sm:p-8">
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
                <div className="col-span-full">
                  <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                    Admin
                  </label>
                  <div className="mt-2">
                  <input
                        id="role"
                        name="role"
                        type="checkbox"
                        defaultChecked={user?.role !== "admin" ? true : false || false}
                        className="block min-w-0 border rounded-md border-gray-400  grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      />
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
  else{
    return(
      <div className="grid grid-flow-row items-start justify-items-center min-h-screen  gap-16 sm:p-6 font-[family-name:var(--font-geist-sans)]">
          <div className="flex flex-col gap-8  sm:items-start w-full">
            <p className='text-center text-gray-500 text-lg'>User not found</p>
          </div>
      </div>
    )
  }
 
}
