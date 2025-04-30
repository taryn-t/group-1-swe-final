
"use client"
import Hero from "@/components/UIElements/Hero";
import Link from "next/link";

const categories = [


  { name: 'Apparel', href: `/merch/apparel?q=${encodeURIComponent("Apparel")}` },
  { name: "Drinkware", href: `/merch/drinkware?q=${encodeURIComponent("Drinkware")}` },
  { name: "Stationery", href: `merch/stationary?q=${encodeURIComponent("Stationery")}` },
  { name: "Accessories", href: `/merch/accessories?q=${encodeURIComponent("Accessories")}` },
  { name: "Tech Accessories", href: `/merch/tech-accessories?q=${encodeURIComponent("Tech Accessories")}` },
  { name: "Home", href: `/merch/home?q=${encodeURIComponent("Home")}` },
  { name: "Auto Accessories", href: `/merch/auto-accessories?q=${encodeURIComponent("Auto Accessories")}` },
  { name: "Sports", href: `/merch/sports?q=${encodeURIComponent("Sports")}` },
  { name: "Gifts", href: `/merch/gifts?q=${encodeURIComponent("Gifts")}` },
  { name: "Pet Accessories", href: `/merch/pet-accessories?q=${encodeURIComponent("Pet Accessories")}` },
]

export default function Home() {
  return (
    <div className="  font-[family-name:var(--font-geist-sans)] py-16 relative min-h-screen ">
      <main className=" w-full h-full relative">
        <Hero/>
        {/* <FindTextbooksSection/> */}
        {/* <TrendingProducts title="School Supplies"/> */}
       {/* Links */}
       <section aria-labelledby="category-heading" className="  xl:mx-auto xl:max-w-7xl xl:px-8 min-h-[500px]">
          <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
            <h2 id="category-heading" className="text-2xl font-bold tracking-tight text-gray-900">
              Shop Merchandise by Category
            </h2>
            <Link href="/merch" className="hidden text-sm font-semibold text-marshall-600 hover:text-marshall-500 sm:block">
              Browse all merchandise
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>

          <div className="mt-4 flow-root">
            <div className="-my-2">
              <div className="relative h-full box-content overflow-x-auto py-2 xl:overflow-visible">
                <div className=" gap-y-8 absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                  {categories.map((category) => (
                    <a
                      key={category.name}
                      href={category.href}
                      className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                    >
                      <span aria-hidden="true" className="absolute inset-0">
                        <img alt="" src={"/book/book.jpg"} className="size-full object-cover" />
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-full z-60 bg-gray-600 opacity-50"
                      />
                      <span className="relative mt-auto text-center text-xl font-bold text-white">{category.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 px-4 sm:hidden">
            <Link href="/merch" className="block text-sm font-semibold text-marshall-600 hover:text-marshall-500">
              Browse all merchandise
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
