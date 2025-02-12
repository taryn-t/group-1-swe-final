import { IoIosSearch } from "react-icons/io";



export default function SearchBar(){

    return(
        <div className="w-full h-full grid place-items-center">
            <div className="w-60 h-8 rounded-xl shadow-sm border-solid border-2 border-gray-300 grid grid-flow-col gap-1 place-items-center px-1">
                <IoIosSearch className="h-6 w-6 text-gray-400"/>
                <input className="text-gray-500 w-full h-full border-none focus-visible:border-none focus-visible:ring-0 focus-visible:outline-none " />
            </div>
        </div>
        
    )
}