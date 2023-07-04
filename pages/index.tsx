import { useState, useEffect, useRef } from "react";
import { Banner, CreatorCard, NFTCard } from "../components";
import images from "@/assets/index";
import makeId from "utils/makeId";
import Image from "next/image";
import { useTheme } from "next-themes";
const Home = () => {
  const [hideArrowButtons, setHideArrowButtons] = useState<boolean>(false);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  const handleScroll = (direction: string) => {
    const { current } = scrollRef;
    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;
    if (direction === "left") {
      (current as HTMLDivElement).scrollLeft -= scrollAmount;
    } else {
      (current as HTMLDivElement).scrollLeft += scrollAmount;
    }
  };

  const isScrollable = () => {
    const { current } = parentRef;
    const { current: childCurrentRef } = scrollRef;

    if (
      (childCurrentRef as HTMLDivElement)?.scrollWidth >=
      (current as HTMLDivElement)?.offsetWidth
    ) {
      setHideArrowButtons(false);
    } else setHideArrowButtons(true);
  };

  useEffect(() => {
    isScrollable();
    window.addEventListener("resize", isScrollable);
    () => {
      window.removeEventListener("resize", isScrollable);
    };
  });

  return (
    <div className="flex flex-col justify-center sm:px-4 p-12">
      <Banner
        bannerTitle="Discover, Collect, and sell extraordinary NFTs"
        parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
        childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
      />

      <div>
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
          Best Creators
        </h1>

        <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
          <div
            className="flex w-max overflow-x-scroll no-scrollbar select-none"
            ref={scrollRef}
          >
            {[10, 8, 5, 4].map((item: number, index: number) => (
              <CreatorCard
                key={`creator-${index}`}
                rank={item}
                creatorImage={images[`creator${item}`]}
                creatorName={`0x${makeId(3)}...${makeId(4)}`}
                creatorEths={10 - item * 0.5}
              />
            ))}
            {!hideArrowButtons && (
              <>
                <div
                  className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0"
                  onClick={() => handleScroll("left")}
                >
                  <Image
                    src={images.left}
                    layout="fill"
                    objectFit="contain"
                    alt="arrow_left"
                    className={theme === "light" ? "filter invert" : ""}
                  />
                </div>
                <div
                  className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0"
                  onClick={() => handleScroll("right")}
                >
                  <Image
                    src={images.right}
                    layout="fill"
                    objectFit="contain"
                    alt="arrow_right"
                    className={theme === "light" ? "filter invert" : ""}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-center">
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
            Hot Birds
          </h1>
          <div className="">Search Bar</div>
        </div>
        <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
            (item: number, index: number) => (
              <NFTCard
                key={`nft-${index}`}
                nft={{
                  id: item,
                  name: `Nifty NFT ${item}`,
                  price: (10 - item * 0.5).toFixed(2),
                  seller: `0x${makeId(3)}...${makeId(4)}`,
                  owner: `0x${makeId(3)}...${makeId(4)}`,
                  description: "Cool NFT on sale",
                }}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
