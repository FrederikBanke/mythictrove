import { Container, Textarea, } from "@nextui-org/react";
import AppBar from "components/AppBar";
import TabContainer from "components/resource/TabContainer";
import Head from "next/head";
import { useRouter, } from "next/router";
import React, { useCallback, useEffect, useState, } from "react";
import { IProject, IProjectData, IResourceTab, } from "types/projects";
import { getProject, updateProject, } from "utils/database/projects";

const PojectPage = () => {
    const router = useRouter();
    const [project, setProject] = useState<IProject>();

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

    const saveTabs = async (data: IResourceTab[]) => {
        if (!project) {
            return;
        }
        const newData: IProjectData = {
            resources: [
                {
                    properties: [],
                    tabs: data,
                },
            ],
        };
        // Save in local state.
        setProject({ ...project, data: newData });
        // Save in DB.
        await updateProject(project.id, newData);
    };

    return (
        <Container>
            <Head>
                <title>{project?.name}</title>
            </Head>
            <AppBar title={project?.name} />
            <TabContainer
                tabs={project?.data?.resources && project.data.resources.length > 0 && project.data.resources[0].tabs || [{ id: "1", name: "main", data: { resourceType: "wiki", content: "" } }]}
                saveData={saveTabs}
            />
        </Container>
    );
};

export default PojectPage;