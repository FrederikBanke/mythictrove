import { Button, Card, Col, Container, Grid, Text, } from "@nextui-org/react";
import { List, } from "components/ui/containers/List";
import React, { FC, useEffect, } from "react";
import { IProject, IResource, } from "types/projects";
import { makeId, } from "utils/makeId";

type ProjectTreeProps = {
    project: IProject;
    onSelect(project: IResource): void;
    onAddResource(project: IResource): void;
};

const ProjectTree: FC<ProjectTreeProps> = ({
    project,
    onSelect,
    onAddResource,
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
        </Container>
    );
};

export default ProjectTree;