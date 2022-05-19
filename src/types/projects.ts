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
    tabs: (IResourceWiki | IResourceMap | IResourceBoard)[];
    properties: IResourceProperty[];
};

export type IResourceWiki = {
};

export type IResourceMap = {
};

export type IResourceBoard = {
};

export type IResourceProperty = {
};