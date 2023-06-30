import Image from "next/image";
import images from "@/assets/index";
import { useTheme } from "next-themes";
import { Button } from "@/components/index";

const FooterLinks = ({
  heading,
  items,
}: {
  heading: string;
  items: string[];
}) => {
  return (
    <div className="flex-1 justify-start items-start">
      <h3 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl mb-10">
        {heading}
      </h3>
      {items.map((item: string, index: number) => (
        <p
          key={index}
          className="font-poppins dark:text-white text-nft-black-1 font-normal text-base cursor-pointer dark:hover:text-nft-gray-1 hover:text-nft-black-1 my-3"
        >
          {item}
        </p>
      ))}
    </div>
  );
};

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer className="flexCenter flex-col border-t dark:border-nft-black-1 border-nft-gray-1 sm:py-8 py-16 mt-10">
      {/* Links & Contact us */}

      <div className="w-full minmd:w-4/5 flex md:flex-col sm:px-4 px-16">
        {/* First col */}
        <div className="flexStart flex-1 flex-col">
          <div className="flexCenter cursor-pointer">
            <Image
              src={images.logo02}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
            <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">
              AchKet
            </p>
          </div>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base mt-6">
            Get the latest updates
          </p>
          <div className="flexBetween md:w-full minlg:w-557 w-357 mt-6 dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 rounded-md">
            <input
              type="email"
              placeholder="Your Email"
              className="h-full flex-1 w-full dark:bg-nft-black-2 bg-white px-4 rounded-md dark:text-white text-nft-black-1 font-normal text-xs minlg:text-lg outline-none"
            />
            <div className="flex-initial">
              <Button
                buttonName="Email me!"
                classStyles="rounded-md nft-gradient"
                handleClickOnButton={() => {}}
              />
            </div>
          </div>
        </div>
        {/* Second Col */}
        <div className="flex-1 flexBetweenStart flex-wrap ml-10 md:ml-0 md:mt-8">
          <FooterLinks
            heading="AchKet"
            items={["Explore", "How it works", "Contact Us"]}
          />
          <FooterLinks
            heading="Support"
            items={[
              "Help Center",
              "Terms of Service",
              "Legal",
              "Privacy Policy",
            ]}
          />
        </div>
      </div>

      {/* Copyright section */}
      <div className="flexCenter w-full mt-5 border-t dark:border-nft-black-1 border-nft-gray-1 sm:px-4 px-16">
        <div className="flexBetween flex-row w-full minmd:w-4/5 sm:flex-col mt-7">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base">
            AchKet, Inc. All rights reserved.
          </p>
          <div className="flex sm:mt-4">
            {[
              images.instagram,
              images.twitter,
              images.telegram,
              images.discord,
            ].map((item: StaticImageData, index: number) => (
              <div className="mx-2 cursor-pointer" key={index}>
                <Image
                  src={item}
                  width={24}
                  height={24}
                  objectFit="contain"
                  alt="social"
                  className={theme === "light" ? "filter invert" : ""}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
