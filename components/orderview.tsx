import { OrderDocument } from "@/models/Order"
import Loading from "./Loading"


function classNames(...classes:string[]) {
    return classes.filter(Boolean).join(' ')
  }
  

interface Props {
  orders: OrderDocument[] | any
}

  export default function OrderView({orders}:Props) {

    if(!orders){
      return <Loading/>
    }

    return (
      <div className="bg-white pt-20 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
          <div className="max-w-xl">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
            <p className="mt-2 text-sm text-gray-500">
              Check the status of recent orders, manage returns, and download invoices.
            </p>
          </div>
  
          <div className="mt-16">
            <h2 className="sr-only">Recent orders</h2>
  
            <div className="space-y-20">
              {orders.map((order:any) => (
                <div key={order._id}>
                  <h3 className="sr-only">
                    Order placed on <time dateTime={order.createdAt.toLocaleString()}>{order.createdAt.toLocaleString()}</time>
                  </h3>
  
                  <div className="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                    <dl className="flex-auto divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                      <div className="max-sm:flex max-sm:justify-between max-sm:py-6 max-sm:first:pt-0 max-sm:last:pb-0">
                        <dt className="font-medium text-gray-900">Date placed</dt>
                        <dd className="sm:mt-1">
                          <time dateTime={order.createdAt.toLocaleString()}>{order.createdAt.toLocaleString()}</time>
                        </dd>
                      </div>
                      <div className="max-sm:flex max-sm:justify-between max-sm:py-6 max-sm:first:pt-0 max-sm:last:pb-0">
                        <dt className="font-medium text-gray-900">Order number</dt>
                        <dd className="sm:mt-1">{order._id.toString()}</dd>
                      </div>
                      <div className="max-sm:flex max-sm:justify-between max-sm:py-6 max-sm:first:pt-0 max-sm:last:pb-0">
                        <dt className="font-medium text-gray-900">Total amount</dt>
                        <dd className="font-medium text-gray-900 sm:mt-1">{order.total}</dd>
                      </div>
                    </dl>
                  </div>
  
                  <table className="mt-4 w-full text-gray-500 sm:mt-6">
                    <caption className="sr-only">Products</caption>
                    <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                      <tr>
                        <th scope="col" className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3">
                          Product
                        </th>
                        <th scope="col" className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell">
                          Price
                        </th>
                        <th scope="col" className="w-0 py-3 text-right font-normal">
                          Info
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                      {order.textbooks.map((product:any) => (
                        <tr key={product._id}>
                          <td className="py-6 pr-8">
                            <div className="flex items-center">
                              <img
                                alt={product.name}
                                src={'/book/book.jpg'}
                                className="mr-6 size-16 rounded-sm object-cover"
                              />
                              <div>
                                <div className="font-medium text-gray-900">{product.name}</div>
                                <div className="mt-1 sm:hidden">{product.price}</div>
                              </div>
                            </div>
                          </td>
                          <td className="hidden py-6 pr-8 sm:table-cell">{product.price}</td>
                          <td className="py-6 text-right font-medium whitespace-nowrap">
                            <a href={`/textbooks/${product._id}`} className="text-marshall-600">
                              View<span className="hidden lg:inline"> Product</span>
                              <span className="sr-only">, {product.name}</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                       {order.merchandise.map((product:any) => (
                        <tr key={product.id}>
                          <td className="py-6 pr-8">
                            <div className="flex items-center">
                              <img
                                alt={product.name}
                                src={'/book/book.jpg'}
                                className="mr-6 size-16 rounded-sm object-cover"
                              />
                              <div>
                                <div className="font-medium text-gray-900">{product.name}</div>
                                <div className="mt-1 sm:hidden">{product.price}</div>
                              </div>
                            </div>
                          </td>
                          <td className="hidden py-6 pr-8 sm:table-cell">{product.price}</td>
                          <td className="py-6 text-right font-medium whitespace-nowrap">
                            <a href={`/textbooks/${product._id}`} className="text-marshall-600">
                              View<span className="hidden lg:inline"> Product</span>
                              <span className="sr-only">, {product.name}</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }