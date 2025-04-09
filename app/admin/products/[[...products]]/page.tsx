'use client'


import CRUDHeader from "@/components/ADmin/CRUDHeader";
import EditProduct from "@/components/ADmin/EditProduct";
import StackedList from "@/components/ADmin/StackedList";
import { useParams } from "next/navigation";



export default function Page() {
  const params = useParams<{products: Array<string>}>()

  console.log(params.products);
  return (
    <div className="grid grid-flow-row items-start justify-items-center min-h-screen  gap-16 sm:p-6 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8  sm:items-start w-full"> 
        {
          
          params.products[0] !== 'edit'  
          ? <>
            <StackedList header="View Products" />
          </> 
          : <>
            <EditProduct slug={params.products[1]}/>
          </>
          
        }
        
      </main>
    </div>
  );
}
