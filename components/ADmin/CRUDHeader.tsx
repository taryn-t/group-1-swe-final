



type Props = {
    header: string
  }

export default function CRUDHeader({header}:Props) {

    return (
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6 w-full">
        <div className="-mt-2 -ml-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="mt-2 ml-4">
            <h3 className="text-base font-semibold text-gray-900">{header}</h3>
          </div>
          <div className="mt-2 ml-4 shrink-0">
            <button
              type="button"
              className="relative inline-flex items-center rounded-md bg-marshall-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-marshall-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marshall-600"
            >
              Add new
            </button>
          </div>
        </div>
      </div>
    )
  }