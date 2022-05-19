import { styled, } from "@stitches/react";

export const Div = styled("div", {

});

export const FlexDiv = styled(Div, {
    display: "flex",
    variants: {
        direction: {
            row: {
                flexFlow: "row nowrap",
            },
            column: {
                flexFlow: "column nowrap",
            },
        },
    },
});