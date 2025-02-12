import { motion } from "framer-motion";
import Link from "next/link"


const links = [
    {
        link:{
           text: "link 1",
            href: "/" 
        }
        
    },
    {
        link:{
            text: "link 2",
             href: "/" 
         }
    },
    {
        link:{
            text: "link 3",
             href: "/" 
         }
    },
    {
        link:{
            text: "link 4",
             href: "/" 
         }
    },
    {
        link:{
            text: "link 5",
             href: "/" 
         }
    },
]

const childVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: "-2rem" },
  };
  

export default function Navlinks(){


    return(
        <nav className="grid grid-flow-col place-items-center w-full h-full">
            {
                links.map(({link}) => (
                    <motion.div
                    key={link.text}
                    variants={childVariants} /** Added variants **/
                    transition={{
                      ease: [0.1, 0.25, 0.3, 1],
                      duration: 0.4,
                    }}
                    >
                       <Link href={link.href} className="text-gray-900 hover:text-marshall">
                            {link.text}
                        </Link> 
                    </motion.div>
                    
                ))
           }
        </nav>
        
           
        
    )
}