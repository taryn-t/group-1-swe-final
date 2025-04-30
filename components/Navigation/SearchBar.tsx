

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";



export default function SearchBar(){
    const [query, setQuery] = useState('');
    const router = useRouter()
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent page reload
        if (!query.trim()) return;
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      };
      
    return(
        <div className="w-full h-full grid place-items-center">
            <form onSubmit={handleSearch} className="w-60 h-8 rounded-xl shadow-sm border-solid border-2 border-gray-300 grid grid-flow-col gap-1 place-items-center py-0.5 px-1">
                <IoIosSearch className="h-6 w-6 text-gray-400"/>
                <input onChange={(e) => setQuery(e.target.value)} placeholder="Search " className="text-gray-500 w-full h-full border-none focus-visible:border-none focus-visible:ring-0 focus-visible:outline-none " />
            </form>
        </div>
        
    )
}