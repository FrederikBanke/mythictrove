import { Button, Card, Row, Text, } from "@nextui-org/react";
import React, { FC, } from "react";
import { IProjectSimple, } from "types/projects";

export type IProjectCardProps = {
    project: IProjectSimple;
    onClick?(project: IProjectSimple): void;
    onDelete?(project: IProjectSimple): void;
    onContextMenu?(project: IProjectSimple): void;
};

const ProjectCard: FC<IProjectCardProps> = ({
    project,
    onClick,
    onDelete,
    onContextMenu,
}) => {
    return (
        <Card hoverable clickable onClick={() => onClick?.(project)} onContextMenu={(e) => {
            if (onContextMenu) {
                e.preventDefault();
                onContextMenu(project);
            }
        }}>
            <Row align="center" justify="space-between">
                <Text>{project.name}</Text>
                <Button auto size="sm" ghost color="error" onPress={() => onDelete?.(project)}>Delete</Button>
            </Row>
        </Card>
    );
};

export default ProjectCard;