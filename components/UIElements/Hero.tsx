

const collections = [


    {
      name: "Textbooks",
      href: '/shop/textbooks',
      imageSrc: 'https://bloximages.newyork1.vip.townnews.com/herald-dispatch.com/content/tncms/assets/v3/editorial/8/69/8695552a-4029-5733-b854-e65db282bce9/605cf8c9a8db7.image.jpg?resize=1200%2C800',
      imageAlt: 'Image of university bookstore shelves',
    },
    {
      name: "School Supplies",
      href: '/shop/school-supplies',
      imageSrc: 'https://bkstr.scene7.com/is/image/Bkstr/9781423238614?$BookCategory_ET$',
      imageAlt: 'Man wearing a comfortable and casual cotton t-shirt.',
    },
    {
      name: "Engineering Supplies",
      href: '/shop/engineering-supplies',
      imageSrc: 'https://bkstr.scene7.com/is/image/Bkstr/8616184?$GMCategory_ET$',
      imageAlt: 'Person sitting at a wooden desk with paper note organizer, pencil and tablet.',
    },
  ]

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
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">Mid-Season Sale</h1>
              <div className="mt-4 sm:mt-6">
                <a
                  href="#"
                  className="inline-block rounded-md border border-transparent bg-marshall-600 px-8 py-3 font-medium text-white hover:bg-marshall-500"
                >
                  Shop Collection
                </a>
              </div>
            </div>
          </div>

          <section aria-labelledby="collection-heading" className="relative -mt-96 sm:mt-0 h-96">
            <h2 id="collection-heading" className="sr-only">
              Collections
            </h2>
            <div className="h-96 mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 sm:px-6 lg:gap-x-8 lg:px-8">
              {collections.map((collection) => (
                <div
                  key={collection.name}
                  className="group relative h-96 rounded-lg bg-white shadow-xl sm:aspect-4/5 sm:h-auto"
                >
                  <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-black opacity-40 h-96 z-20" />
                    <div className="absolute inset-0 overflow-hidden group-hover:opacity-75 ">
                      <img alt={collection.imageAlt} src={collection.imageSrc} className="size-full object-cover" />
                    </div>
                    
                  </div>
                  <div className="absolute inset-0 flex items-end rounded-lg p-6 z-30">
                    <div>
                      <p aria-hidden="true" className="text-sm text-white">
                        Shop the collection
                      </p>
                      <h3 className="mt-1 font-semibold text-white">
                        <a href={collection.href}>
                          <span className="absolute inset-0" />
                          {collection.name}
                        </a>
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        </>
    )
}