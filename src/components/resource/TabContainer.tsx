import { Button, Container, Input, Modal, Row, Text, } from "@nextui-org/react";
import React, { FC, useCallback, useEffect, useState, } from "react";
import { FaFeatherAlt, } from "react-icons/fa";
import { toast, } from "react-toastify";
import { IResourceTab, IResourceWiki, ITabData, ITabTypes, } from "types/projects";
import { confirmAction, } from "utils/confirmAction";
import { makeId, } from "utils/makeId";
import ResourceWiki from "./ResourceWiki";

type TabContainerProps = {
    tabs: IResourceTab[];
    /**
     * Save all of the tabs in the resource.
     */
    saveData(data: IResourceTab[]): void;
};

const TabContainer: FC<TabContainerProps> = ({
    tabs,
    saveData,
}) => {

    const [selectedTabId, setSelectedTabId] = useState<string>(tabs.length < 1 ? "" : tabs[0].id);
    const [selectedTab, setSelectedTab] = useState<IResourceTab>();
    const [newTabName, setNewTabName] = useState<string>();
    const [newTabNameId, setNewTabNameId] = useState<string>();

    const closeTabNameHandler = () => {
        setNewTabNameId(undefined);
    };

    const addTab = useCallback(
        (name = "New Tab") => {
            const newTab: IResourceTab = { id: makeId(), name: name, data: { resourceType: "wiki", content: "" } };
            const newTabs: IResourceTab[] = [...tabs, newTab];
            saveData(newTabs);
            setSelectedTabId(newTabs[newTabs.length - 1].id);
            return newTab;
        },
        [saveData, tabs],
    );

    const getTab = useCallback(
        (tabId: string): IResourceTab => {
            if (tabs.length === 0) {
                // If no tabs, create a new one.
                return addTab();
            }
            const tab = tabs.find((t) => t.id === tabId);
            if (!tab) {
                console.warn("Could not find tab", tabId, "in tabs", tabs, "using first tab instead");
                toast.warn(`Could not find tab ${tabId} in tabs, using first tab instead`);
                setSelectedTabId(tabs[0].id);
                return tabs[0];
            }
            return tab;
        },
        [addTab, tabs],
    );

    useEffect(() => {
        const tab = getTab(selectedTabId);
        console.log("Setting tab to:", tab);
        toast.info(`Set tab to: ${tab.name}`);
        setSelectedTab(tab);
    }, [selectedTabId, getTab]);

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
        console.info("Deleted tab:", tabId);
        saveData(newTabs);
    };

    return (
        <Container>
            <Row gap={2} align="center">
                {
                    tabs.map(t => <Button
                        key={t.id}
                        flat
                        color={t.id === selectedTabId ? "primary" : "secondary"}
                        onClick={() => {
                            setSelectedTabId(t.id);
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
                tab={selectedTab}
                saveTab={(data) => updateTab(selectedTabId, data.data)}
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
    tab: IResourceTab | undefined;
    saveTab(data: IResourceTab): void;
};

const TabContent: FC<TabProps> = ({
    tab,
    saveTab,
}) => {
    if (typeof tab === "undefined") {
        return null;
    }

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
