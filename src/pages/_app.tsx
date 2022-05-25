import { NextUIProvider, } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider, } from "next-themes";
import type { AppProps, } from "next/app";
import { darkTheme, lightTheme, } from "src/stitches.config";

function MyApp({ Component, pageProps }: AppProps) {
  // globalStyles();
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
    </NextThemesProvider>
  );
}

export default MyApp;
