import { Button, Card, Col, Container, Grid, Text, } from "@nextui-org/react";
import { List, } from "components/ui/containers/List";
import React, { FC, useEffect, } from "react";
import { FaTrash, } from "react-icons/fa";
import { IProject, IResource, } from "types/projects";
import { confirmAction, } from "utils/confirmAction";
import { makeId, } from "utils/makeId";

type ProjectTreeProps = {
    project: IProject;
    onSelect(project: IResource): void;
    onAddResource(project: IResource): void;
    onDeleteResource(project: IResource): void;
};

const ProjectTree: FC<ProjectTreeProps> = ({
    project,
    onSelect,
    onAddResource,
    onDeleteResource,
}) => {

    // Select initial resource.
    useEffect(() => {
        if (project.data.resources.length > 0) {
            onSelect(project.data.resources[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                                clickable
                                hoverable
                            >
                                <Container alignItems="center" justify="space-between" css={{ display: "flex", flexFlow: "row", flexWrap: "nowrap", padding: 0 }}>
                                    {resource.name}
                                    <Button
                                        auto
                                        color="error"
                                        onPress={() => confirmAction(() => onDeleteResource(resource), {
                                            confirmTitle: <Text h3>Deleting <Text b weight="bold">{resource.name}</Text></Text>,
                                            confirmAcceptText: "Delete",
                                            confirmDialogContent: <Text>This will delete this resource, and all of its children.</Text>,
                                        })}
                                        icon={<FaTrash />}
                                    />
                                </Container>
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
        </Container>
    );
};

export default ProjectTree;