import { IProject, IProjectSimple, } from "types/projects";
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