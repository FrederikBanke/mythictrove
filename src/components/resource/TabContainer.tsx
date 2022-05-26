import { Button, Container, Input, Modal, Row, Text, } from "@nextui-org/react";
import React, { FC, useEffect, useState, } from "react";
import { FaFeatherAlt, } from "react-icons/fa";
import { IResourceTab, IResourceWiki, ITabData, ITabTypes, } from "types/projects";
import { confirmAction, } from "utils/confirmAction";
import { makeId, } from "utils/makeId";
import ResourceWiki from "./ResourceWiki";

type TabContainerProps = {
    tabs: IResourceTab[];
    saveData(data: IResourceTab[]): void;
};

const TabContainer: FC<TabContainerProps> = ({
    tabs,
    saveData,
}) => {

    const [tab, setTab] = useState<string>(tabs.length < 1 ? "" : tabs[0].id);
    const [newTabName, setNewTabName] = useState<string>();
    const [newTabNameId, setNewTabNameId] = useState<string>();

    const closeTabNameHandler = () => {
        setNewTabNameId(undefined);
    };

    const getTab = (tabId: string) => {
        if (tabs.length === 0) {
            // If no tabs, create a new one.
            return addTab();
        }
        const tab = tabs.find((t) => t.id === tabId);
        if (!tab) {
            console.warn("Could not find tab", tabId, "in tabs", tabs, "using first tab instead");
            return tabs[0];
        }
        return tab;
    };

    const addTab = (name = "New Tab") => {
        const newTab: IResourceTab = { id: makeId(), name: name, data: { resourceType: "wiki", content: "" } };
        const newTabs: IResourceTab[] = [...tabs, newTab];
        saveData(newTabs);
        setTab(newTabs[newTabs.length - 1].id);
        return newTab;
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

    const deleteTab = (tabId: string) => {
        const newTabs: IResourceTab[] = tabs.filter((t) => t.id !== tabId);
        if (newTabs.length === 0) {
            const newTab = addTab("Main");
            newTabs.push(newTab);
        }
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
                    onPress={() => addTab()}
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
                    <Button color="error" auto onClick={() => confirmAction(() => {
                        deleteTab(newTabNameId);
                        closeTabNameHandler();
                    }, {
                        confirmAcceptText: "Delete",
                        confirmTitle: "Are you sure you want to delete this tab?",
                    })}>
                        Delete Tab
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
