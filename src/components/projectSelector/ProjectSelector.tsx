import { Button, Container, Input, Modal, Text, } from "@nextui-org/react";
import { useLiveQuery, } from "dexie-react-hooks";
import { useRouter, } from "next/router";
import React, { useState, } from "react";
import { IProjectSimple, } from "types/projects";
import { addProject, deleteProject, getProjects, renameProject, updateProject, } from "utils/database/projects";
import ProjectCard from "./ProjectCard";
import { FaFeatherAlt, FaPlus, } from "react-icons/fa";
import { confirmAction, } from "utils/confirmAction";
import { makeId, } from "utils/makeId";

const ProjectSelector = () => {
    const router = useRouter();
    const projects = useLiveQuery<IProjectSimple[]>(() => getProjects(), []);
    const [isCreatingProject, setIsCreatingProject] = useState(false);
    const [isRenamingProject, setIsRenamingProject] = useState<IProjectSimple>();
    const [projectName, setProjectName] = useState<string>();

    const createProjectModalCloseHandler = () => {
        setIsCreatingProject(false);
        setIsRenamingProject(undefined);
        setProjectName(undefined);
    };

    const addNewProject = (projectName: string | undefined) => {
        if (projectName) {
            addProject({
                id: makeId(),
                name: projectName,
                data: {
                    resources: [{
                        id: makeId(),
                        name: projectName,
                        properties: [],
                        tabs: [{
                            id: makeId(),
                            name: "Main",
                            data: {
                                resourceType: "wiki",
                                content: "",
                            },
                        }],
                        parent: null,
                    }],
                },
                number: projects?.length || 0,
            });
        }
    };

    const updateProjectName = (projectId: string, projectName: string) => {
        renameProject(projectId, projectName);
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
                            onContextMenu={setIsRenamingProject}
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
                <Modal.Body css={{ paddingTop: "30px" }}>
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        labelPlaceholder="Project Name"
                        contentLeft={<FaFeatherAlt fill="currentColor" />}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onPress={createProjectModalCloseHandler}>
                        Cancel
                    </Button>
                    <Button auto onPress={() => {
                        addNewProject(projectName);
                        createProjectModalCloseHandler();
                    }}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
            {isRenamingProject && <Modal
                closeButton
                aria-labelledby="change-project-name"
                open={true}
                onClose={createProjectModalCloseHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" size={20}>
                        Rename project <Text
                            b
                            size={24}
                            weight="bold"
                            css={{
                                textGradient: "45deg, $yellow600 -20%, $red600 100%",
                            }}
                        >
                            {isRenamingProject.name}
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
                        labelPlaceholder="Project Name"
                        initialValue={isRenamingProject.name}
                        contentLeft={<FaFeatherAlt fill="currentColor" />}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onPress={createProjectModalCloseHandler}>
                        Cancel
                    </Button>
                    <Button auto onPress={() => {
                        if (projectName) {
                            updateProjectName(isRenamingProject.id, projectName);
                        }
                        createProjectModalCloseHandler();
                    }}>
                        Rename
                    </Button>
                </Modal.Footer>
            </Modal>}
        </Container>
    );
};

export default ProjectSelector;