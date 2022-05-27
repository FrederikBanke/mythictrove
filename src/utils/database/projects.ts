import { IProject, IProjectData, IProjectSimple, } from "types/projects";
import { db, } from "./db";

export const addProject = async (project: IProject): Promise<void> => {
    await db.projects.add(project);
    return;
};

export const getProject = async (id: string): Promise<IProject | undefined> => {
    return db.projects.get(id);
};

export const getProjects = async (): Promise<IProjectSimple[]> => {
    return db.projects.toCollection().toArray();
};

export const deleteProject = async (projectId: string) => {
    return db.projects.delete(projectId);
};

export const updateProject = async (projectId: string, data: Partial<IProjectData>) => {
    return db.projects.update(projectId, {
        data: data,
    });
};

export const renameProject = async (projectId: string, name: string) => {
    return db.projects.update(projectId, {
        name,
    });
};