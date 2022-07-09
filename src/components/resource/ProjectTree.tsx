import { Button, Card, Col, Container, Grid, Input, Modal, Text, } from "@nextui-org/react";
import { List, } from "components/ui/containers/List";
import React, { FC, useEffect, useState, } from "react";
import { FaFeatherAlt, FaTrash, } from "react-icons/fa";
import { IProject, IResource, } from "types/projects";
import { confirmAction, } from "utils/confirmAction";
import { makeId, } from "utils/makeId";

type ProjectTreeProps = {
    project: IProject;
    /** When the user clicks on a resource. */
    onSelect(resource: IResource): void;
    /** When a user adds a new resource. */
    onAddResource(resource: IResource): void;
    /** When a user deletes a resource. */
    onDeleteResource(resource: IResource): void;
    /** When a user updates the meta data of a resource, like `name`. */
    onResourceUpdated(resource: IResource): void;
};

const ProjectTree: FC<ProjectTreeProps> = ({
    project,
    onSelect,
    onAddResource,
    onDeleteResource,
    onResourceUpdated,
}) => {
    const [newResourceName, setNewResourceName] = useState<string>();
    const [focusedResource, setFocusedResource] = useState<IResource>();

    // Select initial resource.
    useEffect(() => {
        if (project.data.resources.length > 0) {
            onSelect(project.data.resources[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onCloseHandler = () => {
        setFocusedResource(undefined);
        setNewResourceName(undefined);
    };

    useEffect(() => {
        setNewResourceName(focusedResource?.name);
    }, [focusedResource?.id]);

    return (
        <Container css={{
            display: "flex",
            flexFlow: "column",
            gap: "5px",
            // justifyContent: "space-between",
            height: "800px",
            overflow: "clip",
        }}>
            <Text h1>Project Tree</Text>
            <Container css={{
                overflowY: "auto",
                flexGrow: 1,
            }}>
                <List>
                    {project.data.resources.map((resource) => {
                        return (
                            <Card
                                key={resource.id}
                                onClick={() => onSelect(resource)}
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    setFocusedResource(resource);
                                }}
                                clickable
                                hoverable
                            >
                                {resource.name}
                            </Card>
                        );
                    })}
                </List>
            </Container>
            <Button onPress={() => {
                const newResource: IResource = {
                    id: makeId(),
                    name: "New Resource",
                    properties: [],
                    tabs: [],
                };
                onAddResource(newResource);
            }}>Add New Page</Button>
            {focusedResource && <Modal
                closeButton
                aria-labelledby="change-resource-name"
                open={!!focusedResource}
                onClose={onCloseHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" size={20}>
                        Change page name for <Text
                            b
                            size={24}
                            weight="bold"
                            css={{
                                textGradient: "45deg, $yellow600 -20%, $red600 100%",
                            }}
                        >
                            {focusedResource.name}
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
                        labelPlaceholder="Resource Name"
                        initialValue={focusedResource.name}
                        contentLeft={<FaFeatherAlt fill="currentColor" />}
                        onChange={(e) => setNewResourceName(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onPress={onCloseHandler}>
                        Cancel
                    </Button>
                    <Button auto onPress={() => {
                        if (newResourceName) {
                            onResourceUpdated({
                                ...focusedResource,
                                name: newResourceName
                            });
                        }
                        onCloseHandler();
                    }}>
                        Change
                    </Button>
                    <Button color="error" auto onPress={() => confirmAction(() => {
                        onDeleteResource(focusedResource);
                        onCloseHandler();
                    }, {
                        confirmAcceptText: "Delete",
                        confirmTitle: "Are you sure you want to delete this resource?",
                    })}>
                        Delete Resource
                    </Button>
                </Modal.Footer>
            </Modal>}
        </Container>
    );
};

export default ProjectTree;