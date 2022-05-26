export type IProject = {
    name: string;
    id: string;
    data: IProjectData;
    number: number;
};

export type IProjectSimple = Omit<IProject, "data">;

export type IProjectData = {
    resources: IResource[];
};

export type IResource = {
    tabs: IResourceTab[];
    properties: IResourceProperty[];
};

export type ITabTypes = "wiki" | "map" | "board";

export type ITabData = IResourceWiki | IResourceMap | IResourceBoard;

export type IResourceTab = {
    id: string;
    name: string;
    data: ITabData;
};

export type IResourceWiki = {
    resourceType: "wiki";
    content: string;
};

export type IResourceMap = {
    resourceType: "map";
};

export type IResourceBoard = {
    resourceType: "board";
};

export type IResourceProperty = {
};