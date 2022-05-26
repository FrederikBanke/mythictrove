import { Button, Container, Row, Text, } from "@nextui-org/react";
import React, { FC, useEffect, useState, } from "react";
import { IResourceTab, IResourceWiki, ITabData, ITabTypes, } from "types/projects";
import ResourceWiki from "./ResourceWiki";

type TabContainerProps = {
    tabs: IResourceTab[];
    saveData(data: IResourceTab[]): void;
};

const TabContainer: FC<TabContainerProps> = ({
    tabs,
    saveData,
}) => {
    const [tab, setTab] = useState<string>(tabs[0].id);

    const getTab = (tabId: string) => {
        const tab = tabs.find((t) => t.id === tabId);
        if (!tab) {
            console.warn("Could not find tab", tabId, "in tabs", tabs);
            throw new Error(`Tab with id ${tabId} not found`);
        }
        return tab;
    };

    const addTab = () => {
        const newTabs: IResourceTab[] = [...tabs, { id: `${tabs.length + 1}`, name: "New Tab", data: { resourceType: "wiki", content: "" } }];
        saveData(newTabs);
        setTab(newTabs[newTabs.length - 1].id);
    };

    const updateTab = (tabId: string, data: ITabData) => {
        const newTabs: IResourceTab[] = tabs.map((t) => {
            if (t.id === tabId) {
                return { ...t, data };
            }
            return t;
        });
        saveData(newTabs);
    };

    return (
        <Container>
            <Row gap={2}>
                {
                    tabs.map(tab => <Text key={tab.id} onClick={() => {
                        setTab(tab.id);
                    }} >{tab.name}</Text>)
                }
                <Button size="xs" onPress={addTab}>Add Tab</Button>
            </Row>
            <TabContent
                tab={getTab(tab)}
                saveTab={(data) => updateTab(tab, data.data)}
            />
        </Container>
    );
};

export default TabContainer;

type TabProps = {
    tab: IResourceTab;
    saveTab(data: IResourceTab): void;
};

const TabContent: FC<TabProps> = ({
    tab,
    saveTab,
}) => {
    const saveTabData = (data: ITabData) => {
        saveTab({ ...tab, data });
    };

    switch (tab.data.resourceType) {
        case "wiki":
            return <ResourceWiki key={tab.id} data={tab.data.content} saveData={(data) => {
                const newData: IResourceWiki = {
                    resourceType: "wiki",
                    content: data,
                };
                saveTabData(newData);
            }} />;
        default:
            throw new Error("Unknown tab type");
    }
};
