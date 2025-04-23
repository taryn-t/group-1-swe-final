import Loading from "@/components/Loading";
import { PaginatedTextbookResponse, TextbookDocument } from "@/models/Textbook";
import Link from "next/link"



  type Props = {
    products: PaginatedTextbookResponse;
  }
  export default function ProductGrid({products}:Props) {
    
    if(products.results === undefined){
      return (<Loading/>) 
    }
    return (
        <div className="bg-white">
         
          <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>
    
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products.results.map((product:TextbookDocument) =>  (
                <Link key={product._id} href={`/textbooks/${product._id}`} className="group">
                  <img
                    alt={product.name}
                    src={"/book/book.jpg"}
                    className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                  />
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )
  }