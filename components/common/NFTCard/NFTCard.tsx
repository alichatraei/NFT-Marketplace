import Image from "next/image";
import Link from "next/link";
import images from "@/assets/index";
import { useContext } from "react";
import { INFTContext, NFTContext } from "context/NFTContext";

type NFTType = {
  id: number;
  price: number | string;
  name: string;
  seller: string;
  owner: string;
  description: string;
  image?: StaticImageData | null;
};

interface NFTCardProps {
  nft: NFTType;
}

const NFTCard = ({ nft }: NFTCardProps) => {
  const context= useContext<INFTContext>(NFTContext)
  return (
    <Link
      href={{
        pathname: "/nft-details",
        query: { ...(nft as Omit<NFTType, "image">) },
      }}
    >
      <div className="flex-1 min-w-215 max-w-max xs:max-w-noen sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-8 sm:m-2 cursor-pointer shadow-md">
        <div className="relative w-full h-52 sm:h-36 xs:h-56  mind:h-60 minlg:h-300 rounded-2xl overflow-hidden">
          <Image
            src={nft.image || images[`nft${nft.id}`]}
            layout="fill"
            objectFit="cover"
            alt={`nft-${nft.id}`}
          />
        </div>
        <div className="mt-3 flex flex-col">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
            {nft.name}
          </p>
          <div className="flexBetween mt-3 minlg:mt-3 xs:flex-col xs:items-start">
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
              {nft.price} <span className="normal">{context.nft}</span>
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
              {nft.seller}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
