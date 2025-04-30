"use client";

import { useMerchandiseSearch } from "@/hooks/useMerchandiseSearch";
import Loading from "@/components/Loading";
import MerchFilters from "@/components/Navigation/Products/MerchFilters";
import Single from "@/components/Single";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function Page() {
  const { data: session } = useSession();
  const { results, single, isSingleView, buildHeaderText, page, totalPages } = useMerchandiseSearch();
  const pathname = usePathname();
  const router = useRouter();

  if (isSingleView && single) {
    return <Single product={single} user={session?.user} />;
  }

  if (!results) {
    return <Loading />;
  }
  function generatePageNumbers(currentPage: number, totalPages: number) {
    const pages = [];
  
    if (totalPages <= 5) {
      // if 5 or less pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
  
    return pages;
  }

  const pages = generatePageNumbers(page, Number(totalPages));
  return (
    <div className="grid grid-flow-row items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 pt-12 sm:items-center w-full">
        <MerchFilters header={buildHeaderText()}>
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
              <h2 className="sr-only">Products</h2>

              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {results.map((product) => (
                  <Link
                    key={product._id}
                    href={`/merch/${product._id}`}
                    className="group"
                  >
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
        </MerchFilters>

        {/* Pagination */}
        <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 w-full">
          <div className="-mt-px flex w-0 flex-1">
            <button
              onClick={() => {
                const p = page - 1;
                router.push(`${pathname}?page=${p}`);
              }}
              className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              <ArrowLongLeftIcon aria-hidden="true" className="mr-3 size-5 text-gray-400" />
              Previous
            </button>
          </div>
          <div className="hidden md:-mt-px md:flex">
          {pages.map((p, index) => (
            typeof p === "string" ? (
              <span key={index} className="inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-400">
                {p}
              </span>
            ) : (
              <Link
                key={index}
                href={`${pathname}?page=${p}`}
                className={
                  p === page
                    ? "inline-flex items-center border-t-2 border-marshall-500 px-4 pt-4 text-sm font-medium text-marshall-600"
                    : "inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }
              >
                {p}
              </Link>
            )
          ))}
          </div>
          <div className="-mt-px flex w-0 flex-1 justify-end">
            <button
              onClick={() => {
                const p = page + 1;
                router.push(`${pathname}?page=${p}`);
              }}
              className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              Next
              <ArrowLongRightIcon aria-hidden="true" className="ml-3 size-5 text-gray-400" />
            </button>
          </div>
        </nav>
      </main>
    </div>
  );
}