"use client";

import React, { useState } from 'react'

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { motion } from "motion/react"
import ClientOnly from './ClientOnly';
import { useSpring } from "motion/react"

const Nfts = ({ allNft }) => {
    const [open, setOpen] = useState(null)
    return (
        <>
            <ClientOnly>

                <div className="flex justify-center items-center">

                    <div className='container gap-2'>
                        <ResponsiveMasonry
                            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                            columnsCount={3}
                            gutter="10rem"
                        >
                            <Masonry>
                                {
                                    allNft?.filter(item => item?.image?.cachedUrl != "")?.map((item, index) => {
                                        return (
                                            <>
                                                <motion.div className='border-white/45 m-4 border-2 rounded-2xl overflow-hidden cursor-pointer flex justify-center items-center relative group '
                                                    key={index}
                                                    initial={{
                                                        backgroundColor: "transparent"
                                                    }}
                                                    // whileHover={{
                                                    //     scale: 1.05,
                                                    //     transition: { duration: 1 },
                                                    // }}
                                                    onClick={() => setOpen(item)}
                                                >

                                                    <img src={item?.image?.cachedUrl} alt="" className='transition-all duration-300 hover:blur-none blur-sm ' />
                                                    <div className=" transition-all duration-300 absolute group-hover:opacity-0 block "

                                                    >
                                                        {item?.name || `NFT #${item?.tokenId}`}
                                                    </div>
                                                </motion.div>


                                            </>
                                        )
                                    })
                                }
                            </Masonry>
                        </ResponsiveMasonry>
                    </div>
                </div>
            </ClientOnly>
            {
                open && (
                    <>
                        <div className="relative z-10"
                        >
                            <div className="fixed inset-0 bg-gray-500/75 transition-opacity flex justify-center items-center" onClick={() => setOpen(!open)}>

                                <motion.div
                                    initial={{ x: Math.floor(Math.random() * 2001) - 1000, y: Math.floor(Math.random() * 2001) - 1000 }}
                                    animate={{ x: 0, y: 0, transition: { duration: 1, type: "spring", bounce: 0.45 } }}
                                    className=" "
                                >

                                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div className="sm:flex sm:items-start">
                                                <div className="w-full flex flex-col items-center sm:items-start">
                                                    <img
                                                        src={open?.image?.cachedUrl}
                                                        alt={open?.name}
                                                        className="w-full h-64 object-cover rounded-lg mb-4"
                                                    />
                                                    <h3 className="text-xl font-semibold text-gray-900">
                                                        {open?.name || `NFT #${open?.tokenId}`}
                                                    </h3>
                                                    {open?.description && (
                                                        <p className="mt-2 text-sm text-gray-500">
                                                            {open?.description}
                                                        </p>
                                                    )}
                                                    {open?.attributes && (
                                                        <div className="mt-4 w-full">
                                                            <h4 className="text-sm font-medium text-gray-900">Attributes</h4>
                                                            <div className="mt-2 grid grid-cols-2 gap-2">
                                                                {open?.attributes.map((attr, idx) => (
                                                                    <div key={idx} className="bg-gray-50 p-2 rounded">
                                                                        <p className="text-xs text-gray-500">{attr.trait_type}</p>
                                                                        <p className="text-sm font-medium">{attr.value}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button
                                                type="button"
                                                onClick={() => setOpen(false)}
                                                className="w-full inline-flex justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                    {/* Manash */}
                                </motion.div>
                            </div>
                        </div>
                    </>
                )
            }

        </>
    )
}

export default Nfts
