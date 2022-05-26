import { Button, Container, Input, Modal, Row, Text, } from "@nextui-org/react";
import React, { FC, useEffect, useState, } from "react";
import { FaFeatherAlt, } from "react-icons/fa";
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
    const [newTabName, setNewTabName] = useState<string>();
    const [newTabNameId, setNewTabNameId] = useState<string>();

    const closeTabNameHandler = () => {
        setNewTabNameId(undefined);
    };

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

    const updateTabName = (tabId: string, name: string) => {
        const newTabs: IResourceTab[] = tabs.map((t) => {
            if (t.id === tabId) {
                return { ...t, name };
            }
            return t;
        });
        saveData(newTabs);
    };

    return (
        <Container>
            <Row gap={2} align="center" >
                {
                    tabs.map(t => <Button
                        key={t.id}
                        flat
                        color={t.id === tab ? "primary" : "secondary"}
                        onClick={() => {
                            setTab(t.id);
                        }}
                        onContextMenu={(e) => {
                            e.preventDefault();
                            setNewTabNameId(t.id);
                        }}
                        css={{
                            borderRadius: 0,
                        }}
                    >
                        {t.name}
                    </Button>)
                }
                <Button
                    onPress={addTab}
                    flat
                    color="success"
                    css={{
                        borderRadius: 0,
                    }}
                >
                    Add Tab
                </Button>
            </Row>
            <TabContent
                tab={getTab(tab)}
                saveTab={(data) => updateTab(tab, data.data)}
            />
            {newTabNameId && <Modal
                closeButton
                aria-labelledby="change-tab-name"
                open={!!newTabNameId}
                onClose={closeTabNameHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" size={20}>
                        Change tab name for <Text
                            b
                            size={24}
                            weight="bold"
                            css={{
                                textGradient: "45deg, $yellow600 -20%, $red600 100%",
                            }}
                        >
                            {getTab(newTabNameId).name}
                        </Text>
                    </Text>
                </Modal.Header>
                <Modal.Body css={{ paddingTop: "30px" }}>
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        labelPlaceholder="Tab Name"
                        initialValue={getTab(newTabNameId).name}
                        contentLeft={<FaFeatherAlt fill="currentColor" />}
                        onChange={(e) => setNewTabName(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={closeTabNameHandler}>
                        Cancel
                    </Button>
                    <Button auto onClick={() => {
                        if (newTabName) {
                            updateTabName(newTabNameId, newTabName);
                        }
                        closeTabNameHandler();
                    }}>
                        Change
                    </Button>
                </Modal.Footer>
            </Modal>}
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
