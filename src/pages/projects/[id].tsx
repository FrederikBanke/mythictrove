import { Container, Row, } from "@nextui-org/react";
import AppBar from "components/AppBar";
import ProjectTree from "components/resource/ProjectTree";
import Resource from "components/resource/Resource";
import Head from "next/head";
import { useRouter, } from "next/router";
import React, { useCallback, useEffect, useReducer, useState, } from "react";
import { FaArrowRight, } from "react-icons/fa";
import { toast, } from "react-toastify";
import { IProject, IProjectData, IResource, IResourceTab, ResourcePath, } from "types/projects";
import ProjectContext from "utils/contexts/projectContext";
import { getProject, updateProject, } from "utils/database/projects";
import { createResource, getResource, removeResource, } from "utils/project/resource";
import { projectReducer, } from "utils/reducers/projectReducer";

const ProjectPage = () => {
    const router = useRouter();
    const [project, projectDispatch] = useReducer(projectReducer, undefined);
    // Selected resource.
    const [resource, setResource] = useState<IResource>();

    const loadProject = useCallback(async (projectId: string) => {
        try {
            const project = await getProject(projectId);
            projectDispatch({ type: "setProject", payload: project });
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
        // Create new list with updated resource.
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
            projectDispatch({ type: "updateData", payload: newData });
            // Save in DB.
            await updateProject(project.id, newData);
        } catch (error) {
            toast.error("Could not save project");
            console.error("Could not save project.", error);
        }
    };

    const deleteResource = async (data: IResource) => {
        if (!project) {
            toast.warn("Could not delete resource. Project is undefined");
            console.info("Could not delete resource. Project is undefined.");
            return;
        }
        // Filter away the resource to delete.
        const newResources = project.data.resources.filter(r => r.id !== data.id);
        const newData: IProjectData = {
            resources: newResources,
        };
        try {
            // Save in local state.
            projectDispatch({ type: "updateData", payload: newData });
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
        <ProjectContext.Provider value={{
            dispatch: projectDispatch,
            project: project,
        }}>
            <Container css={{ height: "100%", display: "flex", flexFlow: "column", flexWrap: "nowrap", margin: 0, padding: 0, maxWidth: "unset" }}>
                <Head>
                    <title>{project?.name}</title>
                </Head>
                <AppBar title={project?.name} />
                <p style={{ display: "flex", alignItems: "center", gap: "2px" }}>Breadcrumbs <FaArrowRight /> Resource Name <FaArrowRight /> Resource Name <FaArrowRight /> Resource Name</p>
                <Row justify="space-between" css={{ flexGrow: 1, padding: 0, width: "100%" }}>
                    <Container css={{ maxWidth: "400px", margin: 0, padding: "$10", height: "100%" }}>
                        <ProjectTree
                            project={project}
                            onSelect={(resource) => setResource(resource)}
                            onAddResource={async (resource) => {
                                const newResources = createResource(project.data.resources, resource);
                                const newData: IProjectData = {
                                    resources: newResources,
                                };
                                projectDispatch({ type: "updateData", payload: newData });
                                setResource(resource);
                                // Save in DB.
                                await updateProject(project.id, newData);
                            }}
                            onDeleteResource={deleteResource}
                            onResourceUpdated={saveResource}
                            onResourceMoved={async (resource, target) => {
                                // Dropped on itself
                                if (resource.id === target?.id) return;

                                projectDispatch({ type: "moveResource", payload: [resource.id, target?.id || null] });
                                // Save in DB.
                                await updateProject(project.id, project.data);
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
        </ProjectContext.Provider>
    );
};

export default ProjectPage;