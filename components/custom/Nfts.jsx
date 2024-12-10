"use client";

import React from 'react'

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { motion } from "motion/react"
import ClientOnly from './ClientOnly';

const Nfts = ({ allNft }) => {
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
                                    allNft?.filter(item => item?.image?.cachedUrl != "")?.map((item,index) => {
                                        return (
                                            <>
                                                <motion.div className='border-white/45 m-4 border-2 rounded-2xl overflow-hidden cursor-pointer flex justify-center items-center relative group '
                                                    key={index}
                                                    initial={{
                                                        backgroundColor: "transparent"
                                                    }}
                                                    whileHover={{
                                                        scale: 1.05,
                                                        transition: { duration: 1 },
                                                    }}

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

        </>
    )
}

export default Nfts
