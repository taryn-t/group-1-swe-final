'use client'


import { TextbookDocument } from '@/models/Textbook'
import { UserDocument } from '@/models/User'
import Loading from './Loading'
import { MerchandiseDocument } from '@/models/Merchandise'
import { CartItem, useCart } from '@/app/context/CartContext'

interface Props{
    product: TextbookDocument | undefined | MerchandiseDocument | any
    user: UserDocument | undefined | any
    textbook?: boolean
}

export default function Single({product, user, textbook}:Props) {
  const { addItem } = useCart();
  async function addToCart(){

    const item: CartItem = {
      _id: product?._id,
      name: product?.name,
      price: product?.price,
      isbn: textbook ? product?.isbn : null
    }
    if(textbook){
      // const res = await fetch('/api/cart', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     user_id: user.email,
      //     textbook_id: product?._id
      //   })
      // });
      // const data = await res.json();
      addItem(item)
    }
   else{
    // console.log("adding merch to cart ")
    // const res = await fetch('/api/cart', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     user_id: user.email,
    //     merch_id: product?._id
    //   })
    // });
    // const data = await res.json();
      addItem(item)

   }
    
    
  }
 
  return (
    <div className="bg-white pt-40">
      <div className="pt-6 pb-16 sm:pb-24">
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-2 lg:gap-x-8 lg:grid-rows-1">
            

            {/* Image gallery */}
            <div className="mt-8  lg:col-start-1  lg:mt-0">
              <h2 className="sr-only">Images</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                
                  <img
                    alt={product?.name}
                    src={"/book/book.jpg"}
                    className={'lg:col-span-2 lg:row-span-2 rounded-lg'}
                  />
                
              </div>
            </div>

            
            <div>
            <div className="flex justify-between pb-4">
                <h1 className="text-xl font-bold text-gray-900">{product?.name}</h1>
                <p className="text-xl font-medium text-gray-900 pr-10">${product?.price}</p>
              </div>
                <div className=" border-t border-gray-200  w-full">
                
                {
                  textbook ? 
                  <div className="mt-4 w-full" >
                  <ul role="list" className="w-full list-disc space-y-1 pl-5 text-sm/6 text-gray-500 marker:text-gray-300">
                    <li  className="pl-2 w-full">
                        ISBN: {product?.isbn}
                    </li>
                    <li  className="pl-2 w-full">
                        Author: {product?.author}
                    </li>
                    <li  className="pl-2 w-full">
                        Edition: {product?.edition}
                    </li>
                    <li  className="pl-2 w-full">
                        Publisher: {product?.publisher}
                    </li>
                  </ul>
                  <p>{product.stock} in stock</p>
                </div>
                :
                <div className="mt-4 w-full" >
                  <h3 className='text-lg font-medium text-gray-500'>Description</h3>
                  <p>{product.description}</p>
                  <p>{product.stock} in stock</p>
                </div>
                }
                {
                  product.instock ?
                  <button
                  onClick={addToCart}
                  className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-marshall-600 px-8 py-3 text-base font-medium text-white hover:bg-marshall-700 focus:ring-2 focus:ring-marshall-500 focus:ring-offset-2 focus:outline-hidden"
                >
                  Add to cart
                </button>
                : <button
                className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-300 px-8 py-3 text-base font-medium text-gray-600 "
              >
                Out of stock
              </button>
                }
           
            </div>
            </div>
              
          </div>
        </div>
      </div>
    </div>
  )
}
