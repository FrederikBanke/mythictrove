import { Button, Row, Text, } from "@nextui-org/react";
import { useRouter, } from "next/router";
import React, { FC, } from "react";
import { FaHome, } from "react-icons/fa";

type AppBarProps = {
    title?: string;
};

const AppBar: FC<AppBarProps> = ({
    title,
}) => {
    const router = useRouter();

    return (
        <Row fluid align="center" gap={1}>
            <Button
                auto
                ghost
                icon={<FaHome />}
                onPress={() => router.push("/")}
            />
            <Text h1 size={32}>
                {title}
            </Text>
        </Row>
    );
};

export default AppBar;