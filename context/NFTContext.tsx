import { useState, useEffect, createContext, ReactNode } from "react";
import { NFTMarketAddressAbi, MarketAddress } from "./constants";

export interface INFTContext {
  nft:string
}

const initialNFTContext = {
  nft:""
}

export const NFTContext = createContext<INFTContext>(initialNFTContext);

export const NFTContextProvider = ({ children }:{children:ReactNode}) => {
  const nft = "ETH";
  return <NFTContext.Provider value={{ nft }}>
    {children}
    </NFTContext.Provider>;
};
