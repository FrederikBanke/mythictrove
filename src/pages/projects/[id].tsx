import { Container, Textarea, } from "@nextui-org/react";
import { useRouter, } from "next/router";
import React, { useCallback, useEffect, useState, } from "react";
import { IProject, IProjectData, } from "types/projects";
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

    const saveProject = async (data: string) => {
        if (!project) {
            return;
        }
        const newData: IProjectData = {
            resources: [
                {
                    properties: [],
                    tabs: [
                        {
                            content: data,
                        },
                    ],
                },
            ],
        };
        await updateProject(project.id, newData);
    };

    return (
        <Container>
            <Textarea
                aria-label="editor"
                id="editor"
                animated={false}
                fullWidth
                css={{
                    "label": {
                        backgroundColor: "transparent",
                    },
                }}
                placeholder="Start typing..."
                // @ts-ignore
                initialValue={project?.data.resources[0]?.tabs[0]?.content}
                onChange={(e) => saveProject(e.target.value)}
            />
        </Container>
    );
};

export default PojectPage;