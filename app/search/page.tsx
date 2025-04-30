

"use client"
import Loading from "@/components/Loading";
import Filters from "@/components/Navigation/Products/Filters";
import ProductGrid from "@/components/Navigation/Products/ProductGrid";
import Single from "@/components/Single";
import { MerchandiseDocument } from "@/models/Merchandise";
import { PaginatedTextbookResponse, TextbookDocument } from "@/models/Textbook";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Page() {
  const params = useParams<{ textbooks: string[] }>();
      const searchParams = useSearchParams()
  
  const [results, setResults] = useState<any>();
  const { data: session, status } = useSession();
  const query = searchParams.get('q');

  // All hooks should be declared unconditionally above here

  useEffect(() => {
    if (status === "loading") return;
    console.log("Session:", session);
  }, [session, status]);

  useEffect(() => {
    
      getData();
    
  }, [params, searchParams]);



  async function getData() {
    const role = session?.user?.role ? session?.user?.role : "user"

    const res = await fetch(`/api/search?q=${query}&role=${encodeURIComponent(role)}`, { cache: "no-store" });
    const data = await res.json();
    
    if (data.success) setResults(data);
    
    console.log(data)
        
      
    return
  }


  return(
<div className="grid grid-flow-row items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 pt-12 sm:items-center w-full">
        {results === undefined ? <Loading />
         : <>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">{query ?  results.textbooks.length + results.merchandise.length+' found for "'+ query + '"' 
                : ""
                 }</h1>

         
               <div className="bg-white">
         
                    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>
            

                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    { session?.user?.role !== "Marshall Fan" && session?.user?.role !== "user"?
                            results.textbooks.map((product:TextbookDocument) =>  (
                                <Link key={product._id} href={`/textbooks/${product._id}`} className="group">
                                  <img
                                    alt={product.name}
                                    src={"/book/book.jpg"}
                                    className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                                  />
                                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                                  <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                                </Link>
                              ))
                          
                            :<></>
                            
                        }
                        {

                          results.merchandise.map((product:MerchandiseDocument) =>  (
                            <Link key={product._id} href={`/merch/${product._id}`} className="group">
                                <img
                                alt={product.name}
                                src={"/book/book.jpg"}
                                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                                />
                                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                            </Link>
                            ))
                        }
                       
                        
                    </div>
                    </div>
                </div>
          
         </>
   }
      </main>
    </div>
    
  );
}