import React from "react";

interface IBannerProps {
  bannerTitle: string;
  childStyles?: string;
  parentStyles?: string;
}

const Banner = ({ bannerTitle, childStyles, parentStyles }: IBannerProps) => {
  return (
    <div
      className={`relative w-full flex items-center z-0 overflow-hidden nft-gradient ${parentStyles}`}
    >
      <p
        className={`font-bold font-poppins text-5xl leading-70 ${childStyles}`}
      >
        {bannerTitle}
      </p>

      <div className="absolute w-48 h-48 rounded-full sm:w-32 sm:h-32 white-bg -top-9 -left-16 -z-5" />
      <div className="absolute w-72 h-72 sm:w-56 sm:h-56 rounded-full white-bg -bottom-24 -right-14 -z-5" />
    </div>
  );
};

export default Banner;
