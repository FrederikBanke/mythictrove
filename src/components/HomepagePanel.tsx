import { Card, Col, Container, Divider, Grid, Row, Spacer, Switch, Text, useTheme, } from "@nextui-org/react";
import { useTheme as useNextTheme, } from "next-themes";
import React, { useState, } from "react";
import CharacterSelector from "./characterSelector/CharacterSelector";
import ProjectSelector from "./projectSelector/ProjectSelector";

const HomepagePanel = () => {
    const { setTheme } = useNextTheme();
    const { isDark, type } = useTheme();
    const [tab, setTab] = useState<number>(0);

    return (
        <Grid.Container gap={1} justify="center" wrap="wrap-reverse" css={{ maxWidth: "1000px" }}>
            <Grid sm={4} xs>
                <Card>
                    <Col>
                        <Text h1>Options</Text>
                        <Card clickable hoverable onClick={() => setTab(0)}>Projects</Card>
                        <Spacer />
                        <Card clickable hoverable onClick={() => setTab(1)}>Characters</Card>
                        <Divider y={2} />
                        <Row align="center" justify="space-between">
                            <Text>Dark mode</Text>
                            <Switch
                                checked={isDark}
                                onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
                            />
                        </Row>
                    </Col>
                </Card>
            </Grid>
            <Grid xs>
                <Card>
                    {tab === 0 && <ProjectSelector />}
                    {tab === 1 && <CharacterSelector />}
                </Card>
            </Grid>
        </Grid.Container>
    );
};

export default HomepagePanel;
