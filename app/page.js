"use client";

import { Alchemy, Network } from "alchemy-sdk";
import { motion,useSpring } from "motion/react"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast"
import Nfts from "@/components/custom/Nfts";

export default function Home() {

  const { toast } = useToast()
  const config = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

  const alchemy = new Alchemy(config);

  const [address, setAddress] = useState("0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85");
  const [loading, setLoading] = useState(false)
  const [allNft, setAllNft] = useState([])

  const callNfts = async () => {
    setLoading(true);
    try {
      const nfts = await alchemy.nft.getNftsForOwner(address);
      
      if (!nfts?.ownedNfts?.length) {
        toast({
          title: "No NFTs found",
          description: "This wallet doesn't have any NFTs",
          variant: "destructive",
        });
        setAllNft([]);
        return;
      }

      setAllNft(nfts.ownedNfts);
      toast({
        title: "Success!",
        description: `Found ${nfts.ownedNfts.length} NFTs`,
        variant: "default",
      });
      console.log(nfts.ownedNfts)
    } catch (error) {
      toast({
        title: "Error finding NFTs",
        description: error.message || "Please try again",
        variant: "destructive",
      });
      setAllNft([]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <section className="text-gray-600 body-font ">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20 text-white">
            <motion.div className="text-3xl  tracking-widest font-medium title-font mb-1 text-gray-100 first-letter:text-red-700"
              initial={{ x: -1100 }}
              animate={{
                x: [-1100, 200, 0], rotate: [0, 0, 30, 0], transition: {
                  duration: 1, visualDuration: 0.5,
                  bounce: 0.25
                }
              }}

            >NFT Viewr</motion.div>
            <motion.div initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}>

              <div className="sm:text-3xl text-2xl font-medium title-font mb-4 dark:text-gray-400 italic"

              >View your NFT&apos;s in style
              </div>

              <div className=" flex justify-center items-center">
                <div className="flex gap-4 max-w-3xl w-full p-4  items-center">
                  <Input className="flex-grow text-lg p-6 border-2 border-white/45" placeholder="Enter wallet address" onChange={e => setAddress(e.target.value)} />
                  <Button className="p-6" onClick={callNfts} disabled={loading}>Get NFT&apos;s</Button>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>
      <Nfts allNft={allNft} />
    </>
  );
}
