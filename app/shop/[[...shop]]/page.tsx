'use client'

import Products from "@/components/Navigation/Products/Products";
import TextbookBase from "@/components/Textbooks/TextbookBase";
import { useParams } from "next/navigation";



export default function Page() {
  const params = useParams<{shop: Array<string>}>()

  return (
    <div className="grid grid-flow-row items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 pt-12  sm:items-start w-full"> 
        {
          
          params.shop[0] === 'textbooks' ? 
          (<TextbookBase route={params.shop}/>) : (<Products/>)
        }
        
      </main>
    </div>
  );
}
