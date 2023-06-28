import React from "react";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import logo02 from "@/assets/logo02.png";

interface IMenuItemsProps {
  isMobile: boolean;
  activeNav: string;
  setActiveNav: React.Dispatch<React.SetStateAction<string>>;
}

const MenuItems = ({ isMobile, activeNav, setActiveNav }: IMenuItemsProps) => {
  const generateLink = (index: number) => {
    switch (index) {
      case 0:
        return "/";
      case 1:
        return "/created-nft";
      case 2:
        return "/my-nfts";
      default:
        return "/";
    }
  };

  return (
    <ul
      className={`flex list-none flexCenter ${isMobile && "flex-col h-full"}`}
    >
      {["Explore NFTs", "Listed NFTs", "My NFTs"].map(
        (item: string, index: number) => (
          <li
            key={index}
            className={`flex items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 ${
              activeNav === item
                ? "dark:text-white text-nft-black-1"
                : "dark:text-nft-gray-3 text-nft-gray-1"
            }`}
            onClick={() => {
              setActiveNav(item);
            }}
          >
            <Link href={generateLink(index)}>{item}</Link>
          </li>
        )
      )}
    </ul>
  );
};

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [activeNav, setActiveNav] = useState<string>("Explore NFTs");
  return (
    <nav className="flexBetween dark:bg-nft-dark w-full border-b fixed z-10 p-4 flex-row bg-white dark:border-b-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify-between">
        <Link href="/">
          <div className="flexCenter md:hidden cursor-pointer">
            <Image
              src={logo02}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
            <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">
              AchKit
            </p>
          </div>
        </Link>
        <Link href="/">
          <div className="cursor-pointer md:flex hidden">
            <Image
              src={logo02}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
          </div>
        </Link>
        <div className="flex-row flex-initial flex justify-end ">
          <div className="md:hidden flex mx-3">
            <MenuItems
              isMobile={false}
              activeNav={activeNav}
              setActiveNav={setActiveNav}
            />
          </div>
          <div className="md:flex hidden mx-3">
            <ul className="list-none flexCenter">
              <MenuItems
                isMobile={true}
                activeNav={activeNav}
                setActiveNav={setActiveNav}
              />
            </ul>
          </div>
          <div className="flex items-center mr-2">
            <input
              type="checkbox"
              id="theme__switcher__checkbox"
              className="checkbox"
              onChange={() => {
                setTheme(theme === "light" ? "dark" : "light");
              }}
            />
            <label
              htmlFor="theme__switcher__checkbox"
              className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label cursor-pointer"
            >
              <i className="fas fa-sun" />
              <i className="fas fa-moon" />
              <div className="w-3 h-3 absolute bg-white rounded-full ball" />
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
