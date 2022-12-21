import { createStitches, } from "@stitches/react";
import { createTheme, globalCss, } from "@nextui-org/react";

export const {
    styled,
    css,
    keyframes,
    getCssText,
    theme,
    config,
} = createStitches({
    theme: {
        colors: {
            primary: "#ff3e00",
            primaryOpaque: "#ff3e0050",
            primaryOpaque2: "#ff3e0020",
            text: "white",
            textLight: "grey",
            background: "black",
        },
        shadows: {
            elevated1: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            elevated2: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
            elevated3: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
            elevated4: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
            elevated5: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
        },
    },
    media: {},
    utils: {
        maxLines: (n: number) => ({
            maxHeight: `calc(1.23em * ${n})`,
            lineHeight: "1.23em",
        }),
    },
});

export const lightTheme = createTheme({
    type: "light",
    theme: {},
});

export const darkTheme = createTheme({
    type: "dark",
    theme: {},
});

export const globalStyles = globalCss({
    "html, body, #__next, #__next > div": {
        height: "100%",
        overflow: "clip",
    },
    "*": {
        scrollbarWidth: "thin",
    },
    "::-webkit-scrollbar": {
        width: "8px",
    },
    "::-webkit-scrollbar-thumb": {
        // background: "$primarySolidContrast",
        borderRadius: "1ex",
    },
    "::-webkit-scrollbar-corner": {
        background: " #000",
    },
    [`.${lightTheme} *::-webkit-scrollbar`]: {
        backgroundColor: "LightGray",
    },
    [`.${lightTheme} *::-webkit-scrollbar-thumb`]: {
        background: "gray",
    },
    [`.${darkTheme} *::-webkit-scrollbar`]: {
        backgroundColor: "$secondaryLight",
    },
    [`.${darkTheme} *::-webkit-scrollbar-thumb`]: {
        background: "$secondary",
    },
    ".ProseMirror p.is-editor-empty:first-child::before": {
        color: " #adb5bd",
        content: "attr(data-placeholder)",
        float: "left",
        height: 0,
        pointerEvents: "none",
    },
});
