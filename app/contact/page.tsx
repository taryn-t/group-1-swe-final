'use client'

import Contact from "@/components/Contact/Contact";




export default function Page() {

  return (
    <div className="grid grid-flow-row items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 pt-12  sm:items-center w-full"> 

        <Contact/>
      </main>
    </div>
  );
}
