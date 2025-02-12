'use client';

import { useState } from "react";
import Logo from "./Logo";
import Navlinks from "./Navlinks";
import SearchBar from "./SearchBar";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

const parentVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: "-4rem" },
  };

export default function Navigation(){
    const [hidden, setHidden] = useState(false);
    const [prev, setPrev] = useState(0);
    const { scrollY } = useScroll();
    
    function update(latest: number, prev: number): void {
        if (latest < prev) {
          setHidden(false);
          console.log("visible");
        } else if (latest > 100 && latest > prev) {
          setHidden(true);
          console.log("hidden");
        }
      }
      
    useMotionValueEvent(scrollY, "change", (latest: number) => {
        update(latest, prev);
        setPrev(latest);
      });
      
    return(
        <>
            <motion.div 
            variants={parentVariants}
            animate={hidden ? "hidden" : "visible"}
            transition={{
                ease: [0.1, 0.25, 0.3, 1],
                duration: 0.6,
                staggerChildren: 0.05,
              }}
            className="fixed left-0 w-full h-16 bg-white  grid grid-flow-col place-items-center ">
                <Logo/>
                <Navlinks/>
                <SearchBar/>
            </motion.div>
        </>
    )
}