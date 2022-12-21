import { Textarea, } from "@nextui-org/react";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Tiptap, { linkStyle, } from "components/Tiptap";
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
        <Tiptap
            placeholder="Tiptap editor..."
            content={data}
            onUpdate={({ editor }) => saveData(editor.getHTML())}
            showToolbar
            extensions={[
                TextAlign.configure({ types: ["heading", "paragraph"] }),
                Link.configure({
                    HTMLAttributes: { class: linkStyle().className },
                }),
                Image.configure({
                    allowBase64: true,
                    inline: true,
                }),
                Subscript,
                Superscript,
            ]}
        />
    );
};

export default ResourceWiki;