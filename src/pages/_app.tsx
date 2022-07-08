import { NextUIProvider, } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider, } from "next-themes";
import type { AppProps, } from "next/app";
import { darkTheme, globalStyles, lightTheme, } from "src/stitches.config";
import { ToastContainer, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();
  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
      <ToastContainer />
    </NextThemesProvider>
  );
}

export default MyApp;
