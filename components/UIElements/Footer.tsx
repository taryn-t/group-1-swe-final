'use client'
import { useSession } from "next-auth/react";
import Image from "next/image"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const footerNavigation = {


    products: [
      { name: 'Shop All Textbooks', href: '/textbooks' },
      { name: 'Find Your Textbook', href: '/find-textbooks' },
      
    ],
    company: [
      { name: 'Terms & Conditions', href: '#' },
      { name: 'Privacy', href: '#' },
    ],
    customerService: [
      { name: 'Contact', href: '/contact' },
    ],
  }
  

export default function Footer(){
    const pathname = usePathname();
      const [signedIn, setSignedIn] = useState(false)
      const { data: session, status } = useSession();
    

       useEffect(()=>{
    
          if (session?.signedIn && !signedIn ) {
             setSignedIn(true)
          }
    
        },[session])



    
    if(!pathname.includes('admin')){

    return(
        <>
        
        <footer aria-labelledby="footer-heading" className="bg-gray-50">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 py-20">
            <div className="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16">
              {/* Image section */}
              <div className="col-span-1 md:col-span-2 lg:col-start-1 lg:row-start-1">
                <Image src="/logo.png" alt="" width='64' height='64'/>
              </div>

              {/* Sitemap sections */}
              <div className="col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-3 md:row-start-1 md:mt-0 lg:col-span-6 lg:col-start-2">
                <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Textbooks</h3>
                    <ul role="list" className="mt-6 space-y-6">
                      {footerNavigation.products.map((item) => (
                        <li key={item.name} className="text-sm">
                          <a href={item.href} className="text-gray-500 hover:text-gray-600">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Company</h3>
                    <ul role="list" className="mt-6 space-y-6">
                      {footerNavigation.company.map((item) => (
                        <li key={item.name} className="text-sm">
                          <a href={item.href} className="text-gray-500 hover:text-gray-600">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Customer Service</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.customerService.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a href={item.href} className="text-gray-500 hover:text-gray-600">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Newsletter section */}
              
            </div>
          </div>

          <div className="border-t border-gray-100 py-10 text-center">
            <p className="text-sm text-gray-500"> 2025 CIT 333 Group 1 </p>
          </div>
        </div>
      </footer>
        </>
    )
  }
}