import { Textarea, } from "@nextui-org/react";
import React, { FC, } from "react";

type ResourceWikiProps = {
    data: string;
    saveData(data: string): void;
};

const ResourceWiki: FC<ResourceWikiProps> = ({
    data,
    saveData,
}) => {
    return (
        <Textarea
            aria-label="editor"
            id="editor"
            animated={false}
            fullWidth
            css={{
                "label": {
                    backgroundColor: "transparent",
                },
            }}
            placeholder="Start typing..."
            initialValue={data}
            onChange={(e) => saveData(e.target.value)}
        />
    );
};

export default ResourceWiki;