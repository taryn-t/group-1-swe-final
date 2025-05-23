import { TextbookDocument } from "@/models/Textbook"

const trendingProducts = [


    {
      _id: 1,
      name: 'Leather Long Wallet',
      color: 'Natural',
      price: '$75',
      href: '#',
      imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/home-page-04-trending-product-02.jpg',
      imageAlt: 'Hand stitched, orange leather long wallet.',
    },
    // More products...
  ]
type Props = {
  textbooks: Array<TextbookDocument>;
}

export default function TrendingProducts({textbooks}:Props){

    return(
        <>
                    <section aria-labelledby="trending-heading">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:pt-32">
            <div className="md:flex md:items-center md:justify-between">
              <h2 id="favorites-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                
              </h2>
              <a href="#" className="hidden text-sm font-medium text-marshall-600 hover:text-marshall-500 md:block">
                Shop the collection
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
              {trendingProducts.map((product) => (
                <div key={product._id} className="group relative">
                  <div className="h-56 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80">
                    <img alt="" src={`/book/book.jpg`} className="size-full object-cover" />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">
                    <a href={`/textbooks/${product._id}`}>
                      <span className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-sm md:hidden">
              <a href="#" className="font-medium text-marshall-600 hover:text-marshall-500">
                Shop the collection
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </section>
        </>
    )
}