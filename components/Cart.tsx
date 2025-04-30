'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { TextbookDocument } from '@/models/Textbook'
import Link from 'next/link'
import { MerchandiseDocument } from '@/models/Merchandise'
import { CartItem, useCart } from '@/app/context/CartContext'


interface Props{
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    amount: number
    setAmount: React.Dispatch<React.SetStateAction<number>>;
}
export default function Cart({open, setOpen, amount, setAmount}:Props) {
  const { data: session, status } = useSession();
  const [textbooks, setTextbooks] = useState<Array<TextbookDocument  >>()
  const [merchandise, setMerchandise] = useState<Array<MerchandiseDocument  >>()
  const [email, setEmail] = useState("")
  const { cart, fetchCart, total, removeItem, setUser} = useCart();
  


  useEffect(()=>{
    if(session && !cart){
        getCartItems()
    }
  },[cart])

  async function getCartItems(){
    const em = session?.user?.email ?? "";
    setEmail(em)
    setUser(em)
    fetchCart(em)
    
    
   
  } 


  function remove(id: string){
    const em = session?.user?.email ?? "";

    if(em !== ""){
      setUser(em)
      removeItem(id)
    }
  }
  

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cart?.map((product,i) => (
                          <li key={product._id +i} className="flex py-6">
                            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img alt={product.name} src={"/book/book.jpg"} className="size-full object-cover" />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <Link href={`/textbooks/${product._id}`}>{product.name}</Link>
                                  </h3>
                                  <p className="ml-4">${product.price}</p>
                                </div>
                                {
                                  product?.isbn !== null ?
                                  <p className="mt-1 text-sm text-gray-500">ISBN: {product.isbn}</p> : <></>
                                }
                                
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                {/* <p className="text-gray-500">Qty {product.quantity}</p> */}

                                <div className="flex">
                                  <button type="button" onClick={()=>remove(product?._id)} className="font-medium text-marshall-600 hover:text-marshall-500">
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${total}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <a
                      href="/checkout"
                      className="flex items-center justify-center rounded-md border border-transparent bg-marshall-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-marshall-700"
                    >
                      Checkout
                    </a>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{' '}
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-medium text-marshall-600 hover:text-marshall-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}