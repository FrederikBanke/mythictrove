import { Container, } from "@nextui-org/react";
import React, { FC, } from "react";
import { IResource, IResourceTab, } from "types/projects";
import { makeId, } from "utils/makeId";
import TabContainer from "./TabContainer";

type ResourceProps = {
    /**
     * The resource to render.
     */
    resource: IResource | undefined;
    /**
     * Save the resource data.
     * @param data The new data of the resource.
     * @param resource The old resource before the update.
     */
    saveData(data: IResourceTab[], resource: IResource): void;
};

/**
 * Render a page/article.
 * 
 * Takes a `resource` prop, that is the page-object that will be rendered.
 */
const Resource: FC<ResourceProps> = ({
    resource,
    saveData,
}) => {
    if (!resource) {
        return <div>Loading resource...</div>;
    }

    return (
        <Container css={{ flexGrow: 1, overflow: "auto", height: "stretch" }}>
            <h1>{resource.name}</h1>
            <TabContainer
                tabs={resource.tabs || [{ id: makeId(), name: "main", data: { resourceType: "wiki", content: "" } }]}
                saveData={(data) => saveData(data, resource)}
            />
            <p>Page Properties</p>
        </Container>
    );
};

export default Resource;