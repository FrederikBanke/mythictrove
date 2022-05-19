import { Button, } from "components/ui/Button";
import { Div, FlexDiv, } from "components/ui/Div";
import { useLiveQuery, } from "dexie-react-hooks";
import { useRouter, } from "next/router";
import React, { useEffect, useState, } from "react";
import { IProject, IProjectSimple, } from "types/projects";
import { addProject, deleteProject, getProjects, } from "utils/database/projects";
import ProjectCard from "./ProjectCard";

const ProjectSelector = () => {
    const router = useRouter();
    const projects = useLiveQuery<IProjectSimple[]>(() => getProjects(), []);

    const addNewProject = () => {
        const projectName = prompt("Project name:");
        if (projectName) {
            addProject({
                id: crypto.randomUUID?.() || (Math.random() * 100).toString(),
                name: projectName,
                data: { resources: [] },
                number: projects?.length || 0,
            });
        }
    };

    return (
        <FlexDiv direction="column"
            css={{
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <h2>Projects</h2>
            <FlexDiv direction="column"
                css={{
                    gap: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {
                    projects
                        ?.sort((a, b) => a.number - b.number)
                        .map(project => <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={project => router.push(`/projects/${project.id}`)}
                            onDelete={project => deleteProject(project.id)}
                        />)
                }
                <Button onClick={addNewProject}>Create New Project</Button>
            </FlexDiv>
        </FlexDiv>
    );
};

export default ProjectSelector;