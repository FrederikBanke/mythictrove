import { Container, Row, } from "@nextui-org/react";
import AppBar from "components/AppBar";
import ProjectTree from "components/resource/ProjectTree";
import Resource from "components/resource/Resource";
import Head from "next/head";
import { useRouter, } from "next/router";
import React, { useCallback, useEffect, useState, } from "react";
import { FaArrowRight, } from "react-icons/fa";
import { toast, } from "react-toastify";
import { IProject, IProjectData, IResource, IResourceTab, } from "types/projects";
import { getProject, updateProject, } from "utils/database/projects";

const ProjectPage = () => {
    const router = useRouter();
    const [project, setProject] = useState<IProject>();
    const [resource, setResource] = useState<IResource>();

    const loadProject = useCallback(async (projectId: string) => {
        try {
            const project = await getProject(projectId);
            setProject(project);
        } catch (error) {
            console.warn("Failed to load project", projectId);
        }
    }, []);

    useEffect(() => {
        const projectId = router.query.id;
        if (typeof projectId === "string") {
            loadProject(projectId);
        }
    }, [loadProject, router.query.id]);

    // Update resource in state, when project changes.
    useEffect(() => {
        if (project && resource) {
            const newResource = project.data.resources.find(r => r.id === resource.id);
            if (newResource) {
                setResource(newResource);
            } else {
                toast.warn("Could not set resource.");
                console.warn("Could not find resource after project was updated.");
            }
        }
    }, [project]);

    /**
     * Save the changes to a resource in local state and in the DB.
     * @param data The resource data to save.
     * @returns 
     */
    const saveResource = async (data: IResource) => {
        if (!project) {
            toast.warn("Could not save project. Project is undefined");
            console.info("Could not save project. Project is undefined.");
            return;
        }
        // Find the index of the resource to update.
        const newResources = project.data.resources.map(r => {
            if (r.id === data.id) {
                return data;
            }
            return r;
        });
        const newData: IProjectData = {
            resources: newResources,
        };
        try {
            // Save in local state.
            setProject({ ...project, data: newData });
            // Save in DB.
            await updateProject(project.id, newData);
        } catch (error) {
            toast.error("Could not save project");
            console.error("Could not save project.", error);
        }
    };

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <Container css={{ height: "100%", display: "flex", flexFlow: "column", flexWrap: "nowrap" }}>
            <Head>
                <title>{project?.name}</title>
            </Head>
            <AppBar title={project?.name} />
            <p style={{ display: "flex", alignItems: "center", gap: "2px" }}>Breadcrumbs <FaArrowRight /> Resource Name <FaArrowRight /> Resource Name <FaArrowRight /> Resource Name</p>
            <Row justify="flex-start" css={{ flexGrow: 1 }}>
                <Container css={{ maxWidth: "400px", margin: 0, padding: "$10", height: "100%" }}>
                    <ProjectTree
                        project={project}
                        onSelect={(resource) => setResource(resource)}
                        onAddResource={(resource) => {
                            const newData: IProjectData = {
                                resources: [
                                    resource,
                                    ...project.data.resources,
                                ],
                            };
                            setProject({ ...project, data: newData });
                            setResource(resource);
                        }}
                    />
                </Container>
                <Resource
                    resource={resource}
                    saveData={(tabs, resource) => saveResource({
                        ...resource,
                        tabs: tabs,
                    })}
                />
            </Row>
        </Container>
    );
};

export default ProjectPage;