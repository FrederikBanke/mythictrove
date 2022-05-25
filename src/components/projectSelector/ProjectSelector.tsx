import { Button, Checkbox, Col, Container, Input, Modal, Row, Spacer, Text, } from "@nextui-org/react";
import { useLiveQuery, } from "dexie-react-hooks";
import { useRouter, } from "next/router";
import React, { useEffect, useState, } from "react";
import { IProject, IProjectSimple, } from "types/projects";
import { addProject, deleteProject, getProjects, } from "utils/database/projects";
import ProjectCard from "./ProjectCard";
import { FaFeatherAlt, FaPen, FaPlus, } from "react-icons/fa";
import { confirmAction, } from "utils/confirmAction";

const ProjectSelector = () => {
    const router = useRouter();
    const projects = useLiveQuery<IProjectSimple[]>(() => getProjects(), []);
    const [isCreatingProject, setIsCreatingProject] = useState(false);
    const [projectName, setProjectName] = useState<string>();

    const createProjectModalCloseHandler = () => {
        setIsCreatingProject(false);
        setProjectName(undefined);
        console.log("Create Project Modal closed");
    };

    const addNewProject = (projectName: string | undefined) => {
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
        <Container direction="column"
            css={{
                dflex: "center",
                gap: "10px",
            }}
        >
            <Text h2
                size={60}
                css={{
                    textGradient: "45deg, $yellow600 -20%, $red600 100%",
                }}
                weight="bold"
            >Projects</Text>
            <Container fluid direction="column"
                css={{
                    dflex: "center",
                    gap: "$8",
                    maxWidth: "700px",
                }}
            >
                <Button onPress={() => setIsCreatingProject(true)} icon={<FaPlus />}>Create New Project</Button>
                {
                    projects
                        ?.sort((a, b) => a.number - b.number)
                        .map(project => <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={project => router.push(`/projects/${project.id}`)}
                            onDelete={project => confirmAction(() => deleteProject(project.id), {
                                confirmAcceptText: "Delete",
                                confirmTitle: <Text id="modal-title" size={20}>
                                    Delete <Text
                                        b
                                        size={20}
                                        weight="bold"
                                        css={{
                                            textGradient: "45deg, $yellow600 -20%, $red600 100%",
                                        }}
                                    >
                                        {project.name}
                                    </Text>
                                </Text>,
                                confirmDialogContent: <Text id="modal-title">
                                    Are you sure you want to delete <Text
                                        b
                                        weight="bold"
                                        css={{
                                            textGradient: "45deg, $yellow600 -20%, $red600 100%",
                                        }}
                                    >
                                        {project.name}
                                    </Text>.
                                    All content will be lost.
                                </Text>,
                            })}
                        />)
                }
            </Container>
            <Modal
                closeButton
                aria-labelledby="create-new-project"
                open={isCreatingProject}
                onClose={createProjectModalCloseHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" size={20}>
                        Create a new project for your <Text
                            b
                            size={24}
                            weight="bold"
                            css={{
                                textGradient: "45deg, $yellow600 -20%, $red600 100%",
                            }}
                        >
                            World
                        </Text>
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        labelPlaceholder="Project Name"
                        contentLeft={<FaFeatherAlt fill="currentColor" />}
                        onBlur={(e) => setProjectName(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={createProjectModalCloseHandler}>
                        Cancel
                    </Button>
                    <Button auto onClick={() => {
                        addNewProject(projectName);
                        createProjectModalCloseHandler();
                    }}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ProjectSelector;