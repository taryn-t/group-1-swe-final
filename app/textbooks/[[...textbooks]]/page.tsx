"use client"
import Loading from "@/components/Loading";
import Filters from "@/components/Navigation/Products/Filters";
import ProductGrid from "@/components/Navigation/Products/ProductGrid";
import Single from "@/components/Single";
import { PaginatedTextbookResponse } from "@/models/Textbook";
import { useSession } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams<{ textbooks: string[] }>();
      const searchParams = useSearchParams()
  
  const [results, setResults] = useState<PaginatedTextbookResponse>();
  const [page, setPage] = useState(1);
  const [single, setSingle] = useState();
  const { data: session, status } = useSession();
  const query = searchParams.get('q');
  const [isSearch, setIsSearch] = useState(false)
  const [first, setFirst] = useState<string | undefined>()
  const [second, setSecond] = useState<string | undefined>()
  const [third, setThird] = useState<string | undefined>()

  // All hooks should be declared unconditionally above here

  useEffect(() => {
    if (status === "loading") return;
    console.log("Session:", session);
  }, [session, status]);

  useEffect(() => {
    if (!results) {
      getData();
    }
  }, []);
  const isSingleView = params.textbooks?.length === 1 && params.textbooks[0].length > 3 && params.textbooks[0] != 'search'  ;


  async function getData() {
    console.log(params);
    setFirst(params.textbooks[0])
    setSecond(params.textbooks[1])
    setThird(params.textbooks[2])

    if (!params.textbooks?.length) {
      const res = await fetch(`/api/textbooks`, { cache: "no-store" });
      const data = await res.json();
      if (data.success) setResults(data);
    } else {
      
      const isDepartment = first?.length === 3;
      const s = first === "search" && !second &&!third
      
      setIsSearch(s)
      if (isDepartment && !second) {
        const res = await fetch(`/api/textbooks/search?department=${first}`, { cache: "no-store" });
        const data = await res.json();
        console.log(data)
        if (data.success) setResults(data);
      }
      else if(isSingleView){
        const res = await fetch(`/api/textbooks/search?q=${first}`, { cache: "no-store" });
        const data = await res.json();
        console.log("single")
        console.log(data)
        if (data.success) setSingle(data.results[0]);
      }
      else if ( second) {
        const res = await fetch(`/api/textbooks/search?department=${first}&course=${second}`, { cache: "no-store" });
        const data = await res.json();
        if (data.success) setResults(data);
      } else if (isSearch) {
        const res = await fetch(`/api/textbooks/search?q=${query}`, { cache: "no-store" });
        const data = await res.json();
      
        if (data.success) setResults(data);
      }

      else if(third){
        const res = await fetch(`/api/textbooks/search?department=${first}&course=${second}&section=${third}`, { cache: "no-store" });
        const data = await res.json();
        console.log(data)
        if (data.success) setResults(data);
        console.log(results)
      }
    }
  }


  return isSingleView  && single !== undefined? (
    <Single product={single} user={session?.user} />
  ) : (
    <div className="grid grid-flow-row items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 pt-12 sm:items-center w-full">
        {results === undefined ? <Loading />
         : <>
           
            <Filters header={
              `${isSearch ?  results.results.length+' found for "'+ query + '"' 
                  : third ?  results.results.length+' found for '+ second + ' section ' + third 
                  : second && !third ? results.results.length+' found for'+ second 
                  : first && !second ? results.results.length+' found for department '+ first 
                  : "All Textbooks"
                 }`
            }>
              <ProductGrid products={results} />
            </Filters>
          
         </>
   }
      </main>
    </div>
  );
}