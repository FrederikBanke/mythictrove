export type IProject = {
    name: string;
    id: string;
    data: IProjectData;
    number: number;
};

export type IProjectSimple = Omit<IProject, "data">;

/**
 * The object containing all of the data of a project.
 * 
 * This is data like pages and tabs and their contents and properties.
 */
export type IProjectData = {
    resources: IResource[];
};

export type ResourcePath = string[];

/**
 * A resource element.
 * 
 * Interface for the resource object (a page/article).
 */
export type IResource = {
    id: string;
    name: string;
    tabs: IResourceTab[];
    properties: IResourceProperty[];
    /**
     * ID of the parent resource. `null` if resource is at the root of the project.
     */
    parent: string | null;
    /**
     * IDs of the child resources for this resource.
     */
    children?: string[];
};

export type ITabTypes = "wiki" | "map" | "board";

export type ITabData = IResourceWiki | IResourceMap | IResourceBoard;

/**
 * Object for a resource tab.
 * 
 * Contains data like the `id` and `name` of the tab.
 * Also contains the content in `data`.
 */
export type IResourceTab = {
    id: string;
    name: string;
    data: ITabData;
};

/**
 * An editor tab.
 */
export type IResourceWiki = {
    resourceType: "wiki";
    content: string;
};

/**
 * A map tab.
 */
export type IResourceMap = {
    resourceType: "map";
};

/**
 * A board tab.
 */
export type IResourceBoard = {
    resourceType: "board";
};

/**
 * Page properties.
 */
export type IResourceProperty = {
    id: string;
    name: string;
};