import Image from "next/image";


export default function Logo(){

    return(
        <div className="h-full w-full grid place-items-center">
            <Image src="/logo.png" alt="" width='64' height='64'/>
        </div>
    )
}