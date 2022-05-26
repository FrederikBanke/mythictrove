import { Container, Text, } from "@nextui-org/react";
import React from "react";

const CharacterSelector = () => {
    return (
        <Container direction="column"
            css={{
                dflex: "center",
                gap: "10px",
            }}
        >
            <Text h2>Character Selector</Text>
        </Container>
    );
};

export default CharacterSelector;