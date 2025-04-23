import Link from "next/link";



export default function FindTextbooksSection(){

    return(
        <>
        <div className="mx-auto py-16 max-w-7xl  sm:px-6 lg:px-8 ">
          <div className="relative isolate overflow-hidden bg-marshall-950 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32 grid grid-flow-row place-items-center ">
            <h2 className="mx-auto max-w-3xl text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Find Your Textbook
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-center text-lg text-gray-300">
              Enter your courses to find the required texts
            </p>
            
              <Link
                href="/find-textbooks"
                className="flex-none mt-6 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Enter Courses
              </Link>
          
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
        </div>
        </>
    )
}