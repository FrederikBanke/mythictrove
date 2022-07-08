import { IndexableType, PromiseExtended, } from "dexie";
import { IProject, IProjectData, IProjectSimple, } from "types/projects";
import { db, } from "./db";

/**
 * Add a new project to the DB.
 * @param project The project to add.
 * @returns 
 */
export const addProject = (project: IProject): PromiseExtended<IndexableType> => {
    return db.projects.add(project);
};

/**
 * Get a project from the DB.
 * 
 * @param id The ID of the project to get.
 * @returns The project. Will return `undefined`, if a project with the given ID does not exist.
 */
export const getProject = async (id: string): Promise<IProject | undefined> => {
    return db.projects.get(id);
};

/**
 * Get all of the project from the DB.
 * 
 * @returns A list of projects.
 */
export const getProjects = async (): Promise<IProjectSimple[]> => {
    return db.projects.toCollection().toArray();
};

/**
 * Delete a project from the DB.
 * 
 * This is **irreversible**.
 * @param projectId The ID of the project to delete.
 */
export const deleteProject = async (projectId: string) => {
    return db.projects.delete(projectId);
};

/**
 * Update the data of a project in the DB.
 * 
 * This will only update the data of a project. To rename a project use `renameProject()`.
 * @param projectId The ID of the project to update.
 * @param data The new data for the project. Will merge with the keys defined in `data`.
 */
export const updateProject = async (projectId: string, data: Partial<IProjectData>) => {
    return db.projects.update(projectId, {
        data: data,
    });
};

/**
 * Rename a project in the DB.
 * 
 * This will only rename a project. To update the data of a project use `updateProject()`.
 * @param projectId The ID of the project to rename.
 * @param name The new name for the project.
 */
export const renameProject = async (projectId: string, name: string) => {
    return db.projects.update(projectId, {
        name,
    });
};