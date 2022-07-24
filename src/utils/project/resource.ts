import { IResource, ResourcePath, } from "types/projects";

/**
 * Get resource from an ID.
 * @param resources The list of resources to look through.
 * @param id The id of the resource to get.
 * @returns 
 */
export const getResource = (resources: IResource[], id: string): IResource | undefined => {
    return resources.find(r => r.id === id);
};

/**
 * Create new resource.
 * 
 * New resources are added to end of the list.
 * @param resources The list of resources to add the resource to.
 * @param resource The resource to add.
 * @returns List with added resource.
 */
export const createResource = (resources: IResource[], resource: IResource): IResource[] => {
    // Clone so we do not change the array inplace.
    const clone = resources.map(r => {
        if (r.id === resource.parent) {
            return {
                ...r,
                children: [
                    ...r.children || [],
                    resource.id,
                ],
            };
        }
        return { ...r };
    });
    clone.push(resource);
    return clone;
};

/**
 * Returns a new list, where the resource has been updated.
 * 
 * Uses the `id` to find the resource in `resources`.
 * If it does not exist, nothing happens.
 * @param resources The original resources.
 * @param resource The updated data for the resource.
 */
export const updateResource = (resources: IResource[], resource: IResource): IResource[] => {
    // Clone so we do not change the array inplace.
    const clone = resources.map(r => ({ ...r }));
    const i = clone.findIndex(r => r.id === resource.id);
    const oldResource = clone[i];
    // Check if resource has been moved.
    if (resource.parent !== oldResource.parent) {
        if (resource.parent === resource.id) {
            // Resource cannot be its own parent.
            throw new Error("Cannot set resource as its own parent.");
        }
        // Update parents
        const oldParentIndex = clone.findIndex(r => r.id === oldResource.parent);
        const newParentIndex = clone.findIndex(r => r.id === resource.parent);
        // Update old parent's children list.
        if (oldParentIndex > -1) {
            const oldParent = clone[oldParentIndex];
            clone[oldParentIndex] = {
                ...oldParent,
                children: oldParent.children?.filter(cid => cid !== resource.id),
            };
            // Delete children list if empty.
            if (clone[oldParentIndex].children && clone[oldParentIndex].children!.length < 1) {
                delete clone[oldParentIndex].children;
            }
        }
        // Update new parent's children list.
        if (newParentIndex > -1) {
            const newParent = clone[newParentIndex];
            clone[newParentIndex] = {
                ...newParent,
                children: [
                    ...newParent.children || [],
                    resource.id,
                ],
            };
        }
    }

    clone[i] = resource;
    return clone;
};

/**
 * Returns a new list, where the resource is removed.
 * 
 * Will also remove all of the children.
 * @param resources The list of resources to remove resource from.
 * @param id The ID of the resource to remove.
 */
export const removeResource = (resources: IResource[], id: string): IResource[] => {
    // Clone so we do not change the array inplace.
    let clone = resources.map(r => ({ ...r }));
    const i = clone.findIndex(r => r.id === id);
    const resourceToRemove = clone[i];
    const parent = clone.find(r => r.id === resourceToRemove?.parent) || null;
    // Update the children list of the parent.
    if (parent?.children) {
        parent.children = parent.children.filter(rid => rid !== id);
        if (parent.children.length < 1) {
            delete parent.children;
        }
    }

    // Get list of children to also delete.
    const children = resourceToRemove.children;
    if (children) {
        for (const cid of children) {
            clone = removeResource(clone, cid);
        }
    }
    clone = clone.filter(r => r.id !== id);

    return clone;
};