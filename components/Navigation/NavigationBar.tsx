'use client'
import Image from "next/image";

import { Fragment, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import SearchBar from "./SearchBar";
import Link from "next/link";

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
    {
      id: 'school-supplies',
      name: 'School Supplies',
    //   featured: [
    //     {
    //       name: 'New Arrivals',
    //       href: '#',
    //       imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg',
    //       imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
    //     },
    //     {
    //       name: 'Basic Tees',
    //       href: '#',
    //       imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg',
    //       imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
    //     },
    //   ],
      sections: [
        {
          id: 'supplies',
          name: 'School Supplies',
          items: [
            { name: 'Notebooks & Paper', href: '/shop/school-supplies/notebooks-paper' },
            { name: 'Folders & Binders', href: '/shop/school-supplies/folder-binders' },
            { name: 'Writing Instruments', href: '/shop/school-supplies/writing-instruments' },
            { name: 'Calculators & Batteries', href: '/shop/school-supplies/calculators-batteries' },
            { name: 'Testing Supplies', href: '/shop/school-supplies/testing-supplies' },
            { name: 'Browse All', href: '/shop/school-supplies' },
          ],
        },
        {
          id: 'engineering-supplies',
          name: 'Engineering & Drafting Supplies',
          items: [
            { name: 'Noteooks, Papers, & Boards', href: '/shop/engineering-supplies/notebooks-papers-boards' },
            { name: 'Templates, Measuring & Model Building', href: '/shop/engineering-supplies/templates-measuring-model-building' },
            { name: 'Browse All', href: '/shop/engineering-supplies' },
          ],
        },
        {
            id: 'specialty-supplies',
            name: 'Specialty Supplies',
            items: [
              { name: 'Medical', href: '/shop/specialty-supplies/medical' },
              { name: 'Browse All', href: '/shop/specialty-supplies' },
            ],
          },
        {
          id: 'art-materials',
          name: 'Art Materials',
          items: [
            { name: 'Drawing Supplies', href: '/shop/art-materials/drawing-supplies' },
            { name: 'Art, Paper Boards & Film Products', href: '/shop/art-materials/art-paper-boards-film-products' },
            { name: 'Pastels & Painting Supplies', href: '/shop/art-materials/pastels-painting-supplies' },
            { name: 'Other Art School Supplies', href: '/shop/art-materials/art-school-supplies' },  
            { name: 'Browse All', href: '/shop/art-materials' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Textbooks', href: '/shop/textbooks' },
  ],
}

export default function NavigationBar() {

  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false);
  const [prev, setPrev] = useState(0);
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
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:border-marshall data-selected:text-marshall"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel key={category.name} className="space-y-10 px-4 pt-10 pb-8">
                    {/* <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                          />
                          <a href={item.href} className="mt-6 block font-medium text-gray-900">
                            <span aria-hidden="true" className="absolute inset-0 z-10" />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div> */}
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <Link href={item.href} className="-m-2 block p-2 text-gray-500">
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

          

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
        <p className="flex h-10 items-center justify-center bg-marshall px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free in-store pickup
        </p>

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
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
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex focus-visible:border-none focus-visible:ring-0 ring-0 border-none  focus-visible:outline-none">
                      <motion.div 
                      variants={childVariants} /** Added variants **/
                      transition={{
                        ease: [0.1, 0.25, 0.3, 1],
                        duration: 0.4,
                      }}
                      className="relative flex">
                        <PopoverButton className="focus-visible:border-none focus-visible:ring-0 ring-0 border-none  focus-visible:outline-none  relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-open:border-marshall data-open:text-marshall">
                          {category.name}
                        </PopoverButton>
                      </motion.div>

                      <PopoverPanel
                        transition
                        className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                      >
                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                        <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow-sm" />

                        <div className="relative bg-white">
                          <div className="mx-auto max-w-7xl px-8">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                              {/* <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                {category.featured.map((item) => (
                                  <div key={item.name} className="group relative text-base sm:text-sm">
                                    <img
                                      alt={item.imageAlt}
                                      src={item.imageSrc}
                                      className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                    />
                                    <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                      <span aria-hidden="true" className="absolute inset-0 z-10" />
                                      {item.name}
                                    </a>
                                    <p aria-hidden="true" className="mt-1">
                                      Shop now
                                    </p>
                                  </div>
                                ))}
                              </div> */}
                              <div className="grid grid-cols-4 col-span-2 gap-x-8 gap-y-10 text-sm">
                                {category.sections.map((section) => (
                                  <div key={section.name}>
                                    <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                      {section.name}
                                    </p>
                                    <ul
                                      role="list"
                                      aria-labelledby={`${section.name}-heading`}
                                      className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                    >
                                      {section.items.map((item) => (
                                        <li key={item.name} className="flex">
                                          <Link href={item.href} className="hover:text-gray-800">
                                            {item.name}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <motion.a
                    variants={childVariants} /** Added variants **/
                    transition={{
                      ease: [0.1, 0.25, 0.3, 1],
                      duration: 0.4,
                    }}
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </motion.a>
                  ))}
                </div>
              </PopoverGroup>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Sign in
                  </a>
                  <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                  <Link href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Create account
                  </Link>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <SearchBar/>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link href="#" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </motion.div>
  )
}