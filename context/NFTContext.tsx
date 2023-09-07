import { useState, useEffect, createContext, ReactNode } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Web3Modal from "web3modal";
import { NFTMarketAddressAbi, MarketAddress } from "./constants";
import { Signer, ethers } from "ethers";
import { Provider } from "@ethersproject/abstract-provider";
import { NextRouter } from "next/router";

const projectId = "2U6FddM9HlkDgVid6e4yEKxHWse";
const projectSecret = "2dea0dc899f9e6d982a15cf8587fe897";
const authorization = `Basic ${btoa(projectId + ":" + projectSecret)}`;
const client = ipfsHttpClient({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers: {
    authorization,
  },
});
const fetchContract = (signerOrProvider: Signer | Provider) =>
  new ethers.Contract(MarketAddress, NFTMarketAddressAbi, signerOrProvider);
export interface INFTContext {
  nft: string;
  currentAccounts: any[];
  connectWallet: () => void;
  uploadToIPFS: (file: any) => void;
  createNFT: (
    formInput: { name: string; description: string; price: string },
    fileURL: string,
    router: NextRouter
  ) => void;
}

const initialNFTContext = {
  nft: "",
  currentAccounts: [],
  connectWallet: () => {},
  uploadToIPFS: () => {},
  createNFT: () => {},
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

  const createSale = async (
    url: string,
    formInputPrice: string,
    isReselling?: boolean,
    id?: string
  ) => {
    const web3Model = new Web3Modal();
    const connection = await web3Model.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    console.log(await provider.getCode(MarketAddress));
    const price = ethers.utils.parseUnits(formInputPrice, "ether");
    const contract = fetchContract(signer);
    // const listingPrice = await contract.getListingPrice();
    const transaction = await contract.createToken(url, price);

    await transaction.wait();
  };

  const createNFT = async (
    formInput: { name: string; description: string; price: string },
    fileURL: string,
    router: NextRouter
  ) => {
    const { name, description, price } = formInput;
    console.log("clicked", name, description, price);
    if (!name || !description || !price) return;
    const data = JSON.stringify({ name, description, image: fileURL });

    try {
      const added = await client.add(data);
      const url = `ipfs/${added.path}`;
      await createSale(url, price);
      router.push("/");
    } catch (error) {
      console.log(error);
      console.error("Something happens while create a new NFT");
    }
  };

  return (
    <NFTContext.Provider
      value={{ nft, connectWallet, currentAccounts, uploadToIPFS, createNFT }}
    >
      {children}
    </NFTContext.Provider>
  );
};
