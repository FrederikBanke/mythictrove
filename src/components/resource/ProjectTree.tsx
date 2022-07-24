import { Button, Card, CardProps, Container, Input, Modal, Spacer, Text, } from "@nextui-org/react";
import { List, } from "components/ui/containers/List";
import React, { FC, useEffect, useState, } from "react";
import { FaFeatherAlt, } from "react-icons/fa";
import { IProject, IResource, ResourcePath, } from "types/projects";
import { confirmAction, } from "utils/confirmAction";
import { makeId, } from "utils/makeId";
import { getResource, } from "utils/project/resource";

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
    /**
     * When a user is dragging one resource over another.
     * @param resource The resource being moved.
     * @param target The resource `resource` is being moved to. `null` if moved to root.
     */
    onResourceMoved(resource: IResource, target: IResource | null): void;
    open: string | undefined;
};

const ProjectTree: FC<ProjectTreeProps> = ({
    project,
    onSelect,
    onAddResource,
    onDeleteResource,
    onResourceUpdated,
    onResourceMoved,
    open,
}) => {
    const [newResourceName, setNewResourceName] = useState<string>();
    const [focusedResource, setFocusedResource] = useState<IResource>();
    const [rootResources, setRootResources] = useState<IResource[]>([]);
    const [draggingResource, setDraggingResource] = useState<IResource>();
    const [draggingTargetResource, setDraggingTargetResource] = useState<IResource | null>();
    const [flatView, setFlatView] = useState(false);

    // Select initial resource.
    useEffect(() => {
        if (project.data.resources.length > 0) {
            const firstResource = project.data.resources[0];
            console.log("Set initial resource:", firstResource);
            onSelect(firstResource);
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

    // Find all root resources
    useEffect(() => {
        const roots = [];
        for (const resource of project.data.resources) {
            if (resource.parent === null) {
                roots.push(resource);
            }
        }
        setRootResources(roots);
    }, [project.data.resources]);

    return (
        <Container css={{
            display: "flex",
            flexFlow: "column",
            gap: "5px",
            height: "800px",
            overflow: "clip",
        }}>
            <Text h1>Project Tree</Text>
            <Button ghost={!flatView} onClick={() => setFlatView(prev => !prev)}>Flat View</Button>
            <Container css={{
                overflowY: "auto",
                flexGrow: 1,
                padding: 0,
            }}>
                <List nogap
                    css={{
                        backgroundColor: draggingTargetResource === null ? "$secondary" : undefined,
                    }}
                    onDragOver={(e) => {
                        // This is needed for onDrop to work.
                        e.stopPropagation();
                        e.preventDefault();
                    }}
                    onDragEnter={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setDraggingTargetResource(null);
                    }}
                    onDragLeave={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                    }}
                    onDrop={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (draggingResource && draggingTargetResource === null) {
                            onResourceMoved(draggingResource, draggingTargetResource);
                            setDraggingTargetResource(undefined);
                            setDraggingResource(undefined);
                        }
                    }}
                >
                    {!flatView && rootResources.map((resource) => {
                        return (
                            <ResourceItem
                                key={resource.id}
                                resource={resource}
                                resources={project.data.resources}
                                onSelect={(resource) => onSelect(resource)}
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    setFocusedResource(resource);
                                }}
                                highlight={draggingTargetResource?.id}
                                onResourceDraggedHover={(r) => {
                                    setDraggingTargetResource(r);
                                }}
                                onResourceDragging={(r) => {
                                    setDraggingResource(r);
                                }}
                                onResourceDropped={(r) => {
                                    if (draggingResource && draggingTargetResource) {
                                        onResourceMoved(draggingResource, draggingTargetResource);
                                        setDraggingTargetResource(undefined);
                                        setDraggingResource(undefined);
                                    }
                                }}
                                onResourceReleased={(r) => {
                                    setDraggingResource(undefined);
                                }}
                                open={open}
                            />
                        );
                    })}
                    {flatView && project.data.resources.map((resource) => {
                        return (
                            <ResourceItem
                                key={resource.id}
                                resource={resource}
                                onSelect={(resource) => onSelect(resource)}
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    setFocusedResource(resource);
                                }}
                                highlight={draggingTargetResource?.id}
                                onResourceDraggedHover={(r) => {
                                    setDraggingTargetResource(r);
                                }}
                                onResourceDragging={(r) => {
                                    setDraggingResource(r);
                                }}
                                onResourceDropped={(r) => {
                                    if (draggingResource && draggingTargetResource) {
                                        onResourceMoved(draggingResource, draggingTargetResource);
                                        setDraggingTargetResource(undefined);
                                        setDraggingResource(undefined);
                                    }
                                }}
                                onResourceReleased={(r) => {
                                    setDraggingResource(undefined);
                                }}
                                open={open}
                            />
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
                    parent: null,
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
                                name: newResourceName,
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

type ResourceItemProps = {
    resource: IResource;
    resources?: IResource[];
    /** When the user clicks on a resource. */
    onSelect(resource: IResource): void;
    /** When a user adds a new resource. */
    onAddResource?(resource: IResource): void;
    /** When a user deletes a resource. */
    onDeleteResource?(resource: IResource): void;
    /** When a user updates the meta data of a resource, like `name`. */
    onResourceUpdated?(resource: IResource): void;
    /**
     * @param resource The resource being dragged.
     */
    onResourceDragging(resource: IResource): void;
    /**
     * @param resource The resource being dropped on.
     */
    onResourceDropped(resource: IResource): void;
    /**
     * When the resource is being released on a non-target.
     * @param resource The resource being released.
     */
    onResourceReleased(resource: IResource): void;
    /**
     * @param resource The resource being hovered.
     */
    onResourceDraggedHover(resource: IResource | undefined): void;
    highlight: string | undefined;
    open: string | undefined;
    depth?: number;
} & Omit<CardProps, "resource" | "onSelect">;

const ResourceItem: FC<ResourceItemProps> = ({
    resource,
    resources,
    onAddResource,
    onDeleteResource,
    onResourceUpdated,
    onSelect,
    onResourceDraggedHover,
    onResourceDragging,
    onResourceDropped,
    onResourceReleased,
    highlight,
    open,
    depth = 0,
    ...props
}) => {
    const [children, setChildren] = useState<IResource[]>([]);

    // Find all child resources
    useEffect(() => {
        if (resources) {
            const children: IResource[] = [];
            const childIds = resource.children;
            if (childIds) {
                for (const cid of childIds) {
                    const child = getResource(resources, cid);
                    if (child) {
                        children.push(child);
                    }
                }
            }
            setChildren(children);
        }
    }, [resources, resource.children]);

    /**
     * Hold resource when user starts draggin it.
     * @param resource The resource being dragged.
     */
    const onDragHandler = (resource: IResource | undefined) => {
        if (resource) {
            onResourceDragging(resource);
        }
    };

    /**
     * Handler for when user releases resource.
     * @param resource The resource being dropped on.
     */
    const onDropHandler = (resource: IResource) => {
        onResourceDropped(resource);
        onDragHandler(undefined);
        setTargetHandler(undefined);
    };

    const onHoverStart = (resource: IResource) => {
        setTargetHandler(resource);
    };

    const onHoverLeave = (resource: IResource) => {
        setTargetHandler(undefined);
    };

    /**
     * Set the resource being hovered over.
     * @param resource The resource being hovered over.
     */
    const setTargetHandler = (resource: IResource | undefined) => {
        onResourceDraggedHover(resource);
    };

    const onReleaseHandler = (resource: IResource) => {
        setTargetHandler(undefined);
        onResourceReleased(resource);
    };

    return <Container
        css={{
            width: "100%",
        }}
    >
        <Card
            css={{
                width: "100%",
                padding: `0 ${depth * 20}px`,
            }}
            onClick={() => onSelect(resource)}
            clickable
            hoverable
            draggable
            onDragOver={(e) => {
                // This is needed for onDrop to work.
                e.stopPropagation();
                e.preventDefault();
            }}
            onDragStart={(e) => {
                onDragHandler(resource);
            }}
            onDragEnter={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onHoverStart(resource);
            }}
            onDragLeave={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onHoverLeave(resource);
            }}
            onDrop={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onDropHandler(resource);
            }}
            color={highlight === resource.id ? "secondary" : open === resource.id ? "primary" : "default"}
            {...props}
        >
            {resource.name}
        </Card>
        <Spacer y={0.2} />
        <List nogap css={{
            width: "100%",
            "& > div": {
                padding: 0,
            },
        }}>
            {
                children?.map(r => <ResourceItem
                    key={r.id}
                    resource={r}
                    resources={resources}
                    onResourceDropped={r => onDropHandler(r)}
                    onResourceDraggedHover={r => setTargetHandler(r)}
                    onResourceDragging={r => onDragHandler(r)}
                    onResourceReleased={r => onReleaseHandler(r)}
                    highlight={highlight}
                    depth={depth + 1}
                    onSelect={(r) => onSelect(r)}
                    open={open}
                />)
            }
        </List>
    </Container>;
};