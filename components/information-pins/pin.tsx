'use client'
import React from 'react';
import { motion } from "framer-motion"
type Props = {
    children: React.ReactNode,
    zoomText: string,
    descriptionText: string
}
export default function Pin  ({children, zoomText, descriptionText} : Props)  {
    return (
        <motion.div whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }} className=" cursor-pointer flex p-4 space-x-4 rounded-lg md:space-x-6 border border-2 shadow-xl ">
            <div className="flex justify-center items-center p-2 align-middle rounded-lg sm:p-4 bg-primary">
                {children}
            </div>
            <div className="flex flex-col justify-center align-middle">
                <p className="text-3xl font-semibold leadi">{zoomText}</p>
                <p className="capitalize">{descriptionText}</p>
            </div>
        </motion.div>
    );
};