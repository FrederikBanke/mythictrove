import React from "react";
import { IProject, IProjectData, IResource, ResourcePath, } from "types/projects";
import { createResource, getResource, removeResource, updateResource, } from "utils/project/resource";

export type ProjectActions = {
    type: "setProject";
    payload: IProject | undefined;
} | {
    type: "updateData";
    payload: IProjectData;
} | {
    type: "moveResource";
    payload: [string, string | null];
};

export const projectReducer: React.Reducer<IProject | undefined, ProjectActions> = (prevProject, action): IProject | undefined => {
    if (action.type === "setProject") {
        return action.payload;
    }
    if (!prevProject) {
        throw new Error("Cannot run dispatch action on undefined project.");
    }
    switch (action.type) {
        case "moveResource": {
            const [id, newParentId] = action.payload;
            const resourceToMove = getResource(prevProject.data.resources, id);
            // Check if resources exist
            if (!resourceToMove) {
                console.warn("Could not find resource to move. Searching for ID:", id);
                throw new Error("Could not find resource to move.");
            }
            const newParent = newParentId ? getResource(prevProject.data.resources, newParentId) : null;

            // Move resource
            const movedResource: IResource = {
                ...resourceToMove,
                parent: newParentId,
            };
            const newResources = updateResource(prevProject.data.resources, movedResource);
            const newData: IProjectData = {
                resources: newResources,
            };
            const newProject = projectReducer(prevProject, { type: "updateData", payload: newData });
            return newProject;
        }
        case "updateData": {
            if (!prevProject) {
                throw new Error("Cannot update data of undefined project.");
            }
            return { ...prevProject, data: action.payload };
        }
        default:
            throw new Error();
    }
};