"use client"
import Alert from '@/components/Alerts/alert';
import { CourseDocument } from '@/models/Course';
import { useParams, useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';



export default function Page() {

  const [course, setCourse] = useState<CourseDocument>()
  const [saved, setSaved] = useState(false)
  const [alert, setAlert] = useState(false)
  const router = useRouter();
  const params = useParams<{id:string}>();

  useEffect(()=>{  
    if(course === undefined){
      getCourse()
    }
    
  }, [])
  

 
async function getCourse<Course>(){
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/courses/${params.id}`, {
    cache: "no-store", // disables caching
  });
  const data = await res.json();

  if (!data.success) {
    router.replace('/admin/courses')
  } else{
    setCourse(data.course)
  }
  
  
}


async function handleSubmit(event: FormEvent<HTMLFormElement>) {

  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  
 const res =  await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/courses/${params.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: formData.get("name"),
      email: formData.get("email"),
      role: formData.get("role") === "on" ? "admin" : "course",
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

 
  
  return (
    <>
    
    
    </>

  )
 
}
export const runtime = 'edge';