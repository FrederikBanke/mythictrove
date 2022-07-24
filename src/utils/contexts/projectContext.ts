import React from "react";
import { IProject, } from "types/projects";
import { ProjectActions, } from "utils/reducers/projectReducer";

type IProjectContext = {
    project: IProject | undefined;
    dispatch: React.Dispatch<ProjectActions>;
};

const ProjectContext = React.createContext<IProjectContext>({
    dispatch: () => null,
    project: undefined,
});
export default ProjectContext;