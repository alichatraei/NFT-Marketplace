import { useState, useEffect, createContext, ReactNode } from "react";
import { NFTMarketAddressAbi, MarketAddress } from "./constants";

export interface INFTContext {
  nft:string;
  currentAccounts:any[];
  connectWallet:()=>void
}

const initialNFTContext = {
  nft:"",
  currentAccounts:[],
  connectWallet:()=>{}
}

export const NFTContext = createContext<INFTContext>(initialNFTContext);

export const NFTContextProvider = ({ children }:{children:ReactNode}) => {
  const [currentAccounts,setCurrentAccounts] = useState([])
  const nft = "ETH";

  const checkIfWalletIsConnected=async()=>{
    if(!(window as any).ethereum) return alert("Please install MetaMask")

    const accounts = await (window as any).ethereum.request({method: "eth_accounts"})

    if(accounts.length){
      setCurrentAccounts(accounts)
      console.log(currentAccounts);
    } else console.log("No accounts found.")
    
  }

  const connectWallet = async ()=>{
    if(!(window as any).ethereum) return alert("Please Install MetaMask")

    const account = (window as any).ethereum.request({method:"eth_requestAccounts"});

    setCurrentAccounts(account[0])

    window.location.reload()
  }

  useEffect(()=>{ 
    checkIfWalletIsConnected()
  },[])

  return <NFTContext.Provider value={{ nft ,connectWallet, currentAccounts}}>
    {children}
    </NFTContext.Provider>;
};
