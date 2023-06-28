import type { AppProps } from "next/app";
import "../styles/styles.css";
import { Navbar } from "components/index";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
