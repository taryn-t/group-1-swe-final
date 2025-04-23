import Link from "next/link"



export default function Hero(){

    return(
        <>
        <div className="relative">
          {/* Background image and overlap */}
          <div aria-hidden="true" className="absolute inset-0 hidden sm:flex sm:flex-col">
            <div className="relative w-full flex-1 bg-gray-800">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  alt=""
                  src="https://photos.smugmug.com/2019/Campus-Photos/Block-MOld-Main-May-2019-Rick-Haye/i-RK2Z4Dr/0/88b86cdd/XL/0274-XL.jpg"
                  className="size-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gray-900 opacity-50" />
            </div>
            <div className="h-32 w-full bg-white md:h-40 lg:h-48" />
          </div>

          <div className="relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8">
            {/* Background image and overlap */}
            <div aria-hidden="true" className="absolute inset-0 flex flex-col sm:hidden">
              <div className="relative w-full flex-1 bg-gray-800">
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    alt=""
                    src="https://tailwindui.com/plus-assets/img/ecommerce-images/home-page-04-hero-full-width.jpg"
                    className="size-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gray-900 opacity-50" />
              </div>
              <div className="h-48 w-full bg-white" />
            </div>
            <div className="relative py-32">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                Marshall Univeristy Bookstore
              </h1>
              <div className="mt-4 sm:mt-6">
                <Link
                  href="/textbooks"
                  className="inline-block rounded-md border border-transparent bg-marshall-600 px-8 py-3 font-medium text-white hover:bg-marshall-500"
                >
                  Shop Textbooks
                </Link>
              </div>
            </div>
          </div>

          <section aria-labelledby="collection-heading" className="relative -mt-96 sm:mt-0 h-96">
            <h2 id="collection-heading" className="sr-only">
              Collections
            </h2>
            <div className="h-96 mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl  sm:gap-x-6 sm:gap-y-0 sm:px-6 lg:gap-x-8 lg:px-8">
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
          </section>
        </div>
        </>
    )
}