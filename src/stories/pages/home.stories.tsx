import { ThemeProvider as NextThemesProvider, } from "next-themes";
import { darkTheme, lightTheme, } from "src/stitches.config";
import { NextUIProvider, } from "@nextui-org/react";
import Home from "../../pages/index";

export default {
    title: "Pages/Home",
    component: Home,
};

export const HomePage = () => <NextThemesProvider
    defaultTheme="system"
    attribute="class"
    value={{
        light: lightTheme.className,
        dark: darkTheme.className,
    }}
>
    <NextUIProvider>
        <Home />
    </NextUIProvider>
</NextThemesProvider>;