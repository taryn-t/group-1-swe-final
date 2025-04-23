"use client"
import ShopByCourse from "@/components/Textbooks/Find/ShopByCourse"
import SelectInput from "@/components/UIElements/SelectInput"

const programData = {
    label: "Program",
    items: [
        {id:0, name:"Marshall University"}
    ]
}

const termData = {
    label: "Term",
    items: [
        {id:1, name:"Spring 2025"},
        {id:2, name:"Summer 2025"},
    ]
}


export default function FindTextbooks(){
    

    return(
        <>
        <div className="mx-auto  max-w-7xl w-full  sm:px-6 lg:px-8 pt-40">
          <div className="relative isolate overflow-hidden bg-marshall-950 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32 grid grid-flow-row place-items-center ">
            <h1 className="mx-auto max-w-3xl text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Get Your Textbooks
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-center text-lg text-gray-300">
               Make your selections below to find your textbooks.
            </p>
            
            <form className="max-w-lg w-full mt-6" >
                <div className="grid grid-flow-col gap-3 place-content-stretch">

                <SelectInput data={programData} dark={true} />
                <SelectInput data={termData} dark={true}/>
                </div>
            </form>
            <svg
              viewBox="0 0 1024 1024"
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-x-1/2"
            >
              <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
              <defs>
                <radialGradient
                  r={1}
                  cx={0}
                  cy={0}
                  id="759c1415-0410-454c-8f7c-9a820de03641"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(512 512) rotate(90) scale(512)"
                >
                  <stop stopColor="#33f579" />
                  <stop offset={1} stopColor="#049138" stopOpacity={0} />
                </radialGradient>
              </defs>
            </svg>
          </div>
          <ShopByCourse/>
        </div>
        
        
         </>   
    )
}