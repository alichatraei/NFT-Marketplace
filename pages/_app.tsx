import type { AppProps } from "next/app";
import "../styles/styles.css";
import { Footer, Navbar } from "components/index";
import { ThemeProvider } from "next-themes";
import { NFTContextProvider } from "context/NFTContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NFTContextProvider>
    <ThemeProvider attribute="class">
      <div className="dark:bg-nft-dark bg-white min-h-screen box-content">
        <Navbar />
        <div className="pt-65">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
    </NFTContextProvider>
  );
}
