import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import { useEditor, EditorContent, EditorOptions, Editor, } from "@tiptap/react";
import StarterKit, { StarterKitOptions, } from "@tiptap/starter-kit";
import { FC, MutableRefObject, useEffect, useState, VFC, } from "react";
import { FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight, FaBold, FaHeading, FaItalic, FaLink, FaStrikethrough, FaSubscript, FaSuperscript, } from "react-icons/fa";
import Image from "@tiptap/extension-image";
import { css, styled, } from "src/stitches.config";
import { Button, Card, Container, Divider, Input, Modal, } from "@nextui-org/react";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";

type TiptapProps = Partial<EditorOptions> & {
    showToolbar?: boolean;
    placeholder?: string;
    starterKitOptions?: Partial<StarterKitOptions>;
    /**
     * Default `true`.
     */
    useStarterKit?: boolean;
    editorRef?: MutableRefObject<Editor | null> | ((ref: Editor | null) => void);
};

const Tiptap: VFC<TiptapProps> = ({
    showToolbar,
    placeholder,
    starterKitOptions,
    useStarterKit = true,
    editorRef,
    ...options
}) => {
    const editor = useEditor({
        ...options,
        extensions: useStarterKit ? [
            StarterKit.configure({
                bulletList: { HTMLAttributes: { style: "padding-left: 1em;" } },
                orderedList: { HTMLAttributes: { style: "padding-left: 1em;" } },
                ...starterKitOptions,
            }),
            Placeholder.configure({ placeholder }),
            ...options?.extensions || [],
        ] : [
            Document,
            Text,
            Paragraph,
            Placeholder.configure({ placeholder }),
            ...options?.extensions || [],
        ],
    }, [placeholder, options.editable, showToolbar, useStarterKit]);

    useEffect(() => {
        if (editorRef) {
            if (typeof editorRef === "function") {
                editorRef(editor);
            } else {
                editorRef.current = editor;
            }
        }
    }, [editor, editorRef]);

    return <>
        {showToolbar && editor && <TiptapToolbar editor={editor} />}
        {showToolbar && editor && <><Divider /><br /></>}
        <EditorContent editor={editor} />
    </>;
};

export default Tiptap;

type TiptapToolbarProps = {
    editor: Editor;
};

export const TiptapToolbar: VFC<TiptapToolbarProps> = ({ editor }) => {
    return <Container display="flex" css={{ marginBottom: "5px" }}>
        <Button.Group size="sm">
            <Button auto ghost={editor.isActive("heading", { level: 1 }) ? false : true} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><FaHeading />1</Button>
            <Button auto ghost={editor.isActive("heading", { level: 2 }) ? false : true} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><FaHeading />2</Button>
            <Button auto ghost={editor.isActive("heading", { level: 3 }) ? false : true} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><FaHeading />3</Button>
        </Button.Group>
        <Button.Group size="sm">
            <Button auto ghost={editor.isActive("bold") ? false : true} onClick={() => editor.chain().focus().toggleBold().run()}><FaBold /></Button>
            <Button auto ghost={editor.isActive("italic") ? false : true} onClick={() => editor.chain().focus().toggleItalic().run()}><FaItalic /></Button>
            <Button auto ghost={editor.isActive("strike") ? false : true} onClick={() => editor.chain().focus().toggleStrike().run()}><FaStrikethrough /></Button>
            <Button auto ghost={editor.isActive("superscript") ? false : true} onClick={() => editor.chain().focus().toggleSuperscript().run()}><FaSuperscript /></Button>
            <Button auto ghost={editor.isActive("subscript") ? false : true} onClick={() => editor.chain().focus().toggleSubscript().run()}><FaSubscript /></Button>
        </Button.Group>
        {editor.can().setTextAlign?.("left") && <Button.Group size="sm">
            <AlignButtons editor={editor} />
        </Button.Group>}
        {editor.can().toggleLink?.({ href: "" }) && <Button.Group size="sm">
            <LinkButtons editor={editor} />
        </Button.Group>}
    </Container>;
};

const AlignButtons: VFC<TiptapToolbarProps> = ({ editor }) => <>
    <Button ghost={editor.isActive({ textAlign: "left" }) ? false : true} onClick={() => editor.chain().focus().setTextAlign("left").run()}><FaAlignLeft /></Button>
    <Button ghost={editor.isActive({ textAlign: "center" }) ? false : true} onClick={() => editor.chain().focus().setTextAlign("center").run()}><FaAlignCenter /></Button>
    <Button ghost={editor.isActive({ textAlign: "right" }) ? false : true} onClick={() => editor.chain().focus().setTextAlign("right").run()}><FaAlignRight /></Button>
    <Button ghost={editor.isActive({ textAlign: "justify" }) ? false : true} onClick={() => editor.chain().focus().setTextAlign("justify").run()}><FaAlignJustify /></Button>
</>;

const LinkButtons: VFC<TiptapToolbarProps> = ({ editor }) => {
    const [openLinkDialog, setOpenLinkDialog] = useState(false);
    const [link, setLink] = useState("");

    useEffect(() => {
        if (!openLinkDialog) {
            setLink("");
        } else {
            const currentLink = editor.getAttributes("link").href ?? "";
            setLink(currentLink);
        }
    }, [openLinkDialog, editor]);

    return <>
        <Button ghost={editor.isActive("link") || editor.isActive("image") ? false : true} onClick={() => setOpenLinkDialog(true)}><FaLink /></Button>
        <Modal
            open={openLinkDialog}
            closeButton
            onClose={() => setOpenLinkDialog(false)}
        >
            <Modal.Body>
                <Container>
                    <Input
                        fullWidth
                        bordered
                        placeholder="Link"
                        label="Link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button.Group color="error">
                    <Button onClick={() => {
                        editor.commands.unsetLink();
                        setOpenLinkDialog(false);
                    }}>Fjern link</Button>
                </Button.Group>
                <Button.Group color="primary">
                    <Button onClick={() => {
                        editor.chain().focus().setLink({ href: link }).run();
                        setOpenLinkDialog(false);
                    }}>Link</Button>
                    <Button onClick={() => {
                        editor.chain().focus().setImage({ src: link }).run();
                        setOpenLinkDialog(false);
                    }}>Image</Button>
                </Button.Group>
            </Modal.Footer>
        </Modal>
    </>;
};

export const linkStyle = css({ fontWeight: "bold" });