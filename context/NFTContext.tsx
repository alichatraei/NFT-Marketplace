import { useState, useEffect, createContext, ReactNode } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { NFTMarketAddressAbi, MarketAddress } from "./constants";

const projectId = "2U6FddM9HlkDgVid6e4yEKxHWse";
const projectSecret = "2dea0dc899f9e6d982a15cf8587fe897";
const authorization = `Basic ${btoa(projectId + ":" + projectSecret)}`;
const client = ipfsHttpClient({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers: {
    authorization,
  },
});

export interface INFTContext {
  nft: string;
  currentAccounts: any[];
  connectWallet: () => void;
  uploadToIPFS: (file: any) => void;
}

const initialNFTContext = {
  nft: "",
  currentAccounts: [],
  connectWallet: () => {},
  uploadToIPFS: () => {},
};

export const NFTContext = createContext<INFTContext>(initialNFTContext);

export const NFTContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentAccounts, setCurrentAccounts] = useState([]);
  const nft = "ETH";

  const checkIfWalletIsConnected = async () => {
    if (!(window as any).ethereum) return alert("Please install MetaMask");

    const accounts = await (window as any).ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length) {
      setCurrentAccounts(accounts);
    } else console.error("No accounts found.");
  };

  const connectWallet = async () => {
    if (!(window as any).ethereum) return alert("Please Install MetaMask");

    const account = (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });

    setCurrentAccounts(account[0]);

    window.location.reload();
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const uploadToIPFS = async (file: File) => {
    try {
      const fileUrl = await client.add({ content: file });
      const url = `ipfs/${fileUrl.path}`;
      return url;
    } catch (error) {
      console.error("Error loading image to ipfs");
    }
  };

  return (
    <NFTContext.Provider
      value={{ nft, connectWallet, currentAccounts, uploadToIPFS }}
    >
      {children}
    </NFTContext.Provider>
  );
};
