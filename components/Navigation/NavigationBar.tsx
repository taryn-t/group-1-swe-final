'use client'
import Image from "next/image";
import { signOut } from "next-auth/react";
import {  useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  PopoverGroup,

} from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Cart from "../Cart";

const parentVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: "-4rem" },
  };
  const childVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: "-2rem" },
  };
  
export const navigation = {


  categories: [
  //  {
  //      id: 'school-supplies',
  //     name: 'School Supplies',
  //   //   featured: [
  //   //     {
  //   //       name: 'New Arrivals',
  //   //       href: '#',
  //   //       imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg',
  //   //       imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
  //   //     },
  //   //     {
  //   //       name: 'Basic Tees',
  //   //       href: '#',
  //   //       imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg',
  //   //       imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
  //   //     },
  //   //   ],
  //     sections: [
  //       {
  //         id: 'supplies',
  //         name: 'School Supplies',
  //         items: [
  //           { name: 'Notebooks & Paper', href: '/shop/school-supplies/notebooks-paper' },
  //           { name: 'Folders & Binders', href: '/shop/school-supplies/folder-binders' },
  //           { name: 'Writing Instruments', href: '/shop/school-supplies/writing-instruments' },
  //           { name: 'Calculators & Batteries', href: '/shop/school-supplies/calculators-batteries' },
  //           { name: 'Testing Supplies', href: '/shop/school-supplies/testing-supplies' },
  //           { name: 'Browse All', href: '/shop/school-supplies' },
  //         ],
  //       },
  //       {
  //         id: 'engineering-supplies',
  //         name: 'Engineering & Drafting Supplies',
  //         items: [
  //           { name: 'Noteooks, Papers, & Boards', href: '/shop/engineering-supplies/notebooks-papers-boards' },
  //           { name: 'Templates, Measuring & Model Building', href: '/shop/engineering-supplies/templates-measuring-model-building' },
  //           { name: 'Browse All', href: '/shop/engineering-supplies' },
  //         ],
  //       },
  //       {
  //           id: 'specialty-supplies',
  //           name: 'Specialty Supplies',
  //           items: [
  //             { name: 'Medical', href: '/shop/specialty-supplies/medical' },
  //             { name: 'Browse All', href: '/shop/specialty-supplies' },
  //           ],
  //         },
  //       {
  //         id: 'art-materials',
  //         name: 'Art Materials',
  //         items: [
  //           { name: 'Drawing Supplies', href: '/shop/art-materials/drawing-supplies' },
  //           { name: 'Art, Paper Boards & Film Products', href: '/shop/art-materials/art-paper-boards-film-products' },
  //           { name: 'Pastels & Painting Supplies', href: '/shop/art-materials/pastels-painting-supplies' },
  //           { name: 'Other Art School Supplies', href: '/shop/art-materials/art-school-supplies' },  
  //           { name: 'Browse All', href: '/shop/art-materials' },
  //         ],
  //       },
  //     ],
  //   },
    // {
    //   id: 'textbooks',
    //   name: 'Textbooks',
    // //   featured: [
    // //     {
    // //       name: 'New Arrivals',
    // //       href: '#',
    // //       imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg',
    // //       imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
    // //     },
    // //     {
    // //       name: 'Basic Tees',
    // //       href: '#',
    // //       imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg',
    // //       imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
    // //     },
    // //   ],
    //   sections: [
    //     {
    //       id: 'textbook-section',
    //       name: 'Textbooks',
    //       items: [
    //         { name: 'Find Your Textbook', href: '/find-textbooks' },
    //       ],
    //     },
    //   ],
    // },
  ],
  pages: [
    { name: 'Shop Textbooks', href: '/textbooks' },
    { name: 'Find Your Textbook', href: '/find-textbooks' },
    { name: 'Contact', href: '/contact' },
  ],
}

export default function NavigationBar() {
  const { data: session, status } = useSession();
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [signedIn, setSignedIn] = useState(false)
  const [hidden, setHidden] = useState(false);
  const [prev, setPrev] = useState(0);
  const [cartAmt, setCartAmt] = useState(0);
  const { scrollY } = useScroll();

  function update(latest: number, prev: number): void {
      if (latest < prev) {
        setHidden(false);
        console.log("visible");
      } else if (latest > 100 && latest > prev) {
        setHidden(true);
        console.log("hidden");
      }
    }

  
  useMotionValueEvent(scrollY, "change", (latest: number) => {
      update(latest, prev);
      setPrev(latest);
    });


    useEffect(()=>{

      if (session?.signedIn && !signedIn ) {
         setSignedIn(true)
      }

    },[session])

    const clickSignOut = () =>{
      signOut();
    }
    

  if(!pathname.includes('admin')) {

  
  return (
    <motion.div
    variants={parentVariants}
            animate={hidden ? "hidden" : "visible"}
            transition={{
                ease: [0.1, 0.25, 0.3, 1],
                duration: 0.6,
                staggerChildren: 0.05,
              }}
    className="bg-white fixed left-0 w-full z-50">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <Link href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                    {page.name}
                  </Link>
                </div>
              ))}
            </div>

            {/* Links */}
            

          

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                  Sign in
                </a>
              </div>
              <div className="flow-root">
                <Link href="#" className="-m-2 block p-2 font-medium text-gray-900">
                  Create account
                </Link>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6">
              <Link href="#" className="-m-2 flex items-center p-2">
                <img
                  alt=""
                  src="https://tailwindui.com/plus-assets/img/flags/flag-canada.svg"
                  className="block h-auto w-5 shrink-0"
                />
                <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                <span className="sr-only">, change currency</span>
              </Link>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-marshall-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free in-store pickup
        </p>

        <nav aria-label="Top" className="mx-auto w-full  ">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center max-w-7xl mx-auto">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <motion.div variants={childVariants} /** Added variants **/
                    transition={{
                      ease: [0.1, 0.25, 0.3, 1],
                      duration: 0.4,
                    }} 
                    className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <span className="sr-only">Marshall Univeristy</span>
                  <Image
                    alt=""
                    src="/logo.png"
                    className="h-8 w-auto"
                    width="50"
                    height="50"
                  />
                </Link>
              </motion.div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                 

                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </Link>
                  ))}  
                </div>

                
              </PopoverGroup>
                 
              <div className="ml-auto flex items-center">
                {
                  !signedIn ? (
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Link href="/sign-in" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                      Sign in
                    </Link>
                    <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                    <Link href="/create-account" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                      Create account
                    </Link>
                  </div>
                  ) : (
                    <>
                     <button onClick={clickSignOut} className="bg-none outline-none focus:outline-none focus:ring-0 ring-0 text-sm font-medium text-gray-700 hover:text-gray-800">
                      Sign out
                    </button>
                    
                    </>
                  )
                }
               

                {/* Search */}
                <div className="flex lg:ml-6">
                  <SearchBar/>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <button onClick={()=>  setCartOpen(!cartOpen)  } className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartAmt}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <Cart open={cartOpen} setOpen={setCartOpen} setAmount={setCartAmt} amount={cartAmt}/>
    </motion.div>
  )
}
}