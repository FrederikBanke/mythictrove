import { Button, } from "components/ui/Button";
import { Div, FlexDiv, } from "components/ui/Div";
import React, { FC, } from "react";
import { styled, } from "src/stitches.config";
import { IProjectSimple, } from "types/projects";

const Span = styled("span", {
    cursor: "pointer",
});

export type IProjectCardProps = {
    project: IProjectSimple;
    onClick?(project: IProjectSimple): void;
    onDelete?(project: IProjectSimple): void;
};

const ProjectCard: FC<IProjectCardProps> = ({
    project,
    onClick,
    onDelete,
}) => {
    return (
        <FlexDiv direction="row"
            css={{
                border: "1px solid grey",
                borderRadius: "5px",
                padding: "10px",
                width: "300px",
                justifyContent: "space-between",
            }}
        >
            <Span onClick={() => onClick?.(project)}>{project.name}</Span>
            <Button onClick={() => onDelete?.(project)}>Delete</Button>
        </FlexDiv>
    );
};

export default ProjectCard;