import { Button, Modal, Text, } from "@nextui-org/react";
import { render, unmountComponentAtNode, } from "react-dom";

type IConfirmAction = (action: Function, options?: {
    confirmTitle?: string | JSX.Element;
    confirmCancelText?: string;
    confirmAcceptText?: string;
    confirmDialogContent?: JSX.Element;
    onCancel?(): void;
    onConfirm?(): void;
}) => void;

/**
 * Render a dialog to confirm an action.
 * 
 * Will render a dialog component, where the user will be asked to confirm the `action`.
 * @param action The function to run when the user confirms the dialog.
 * @param options Options for the dialog.
 */
export const confirmAction: IConfirmAction = (action, options = {}) => {
    let container = document.getElementById("confirmDialog");
    if (!container) {
        const newContainer: HTMLElement = document.createElement("div");
        newContainer.setAttribute("id", "confirmDialog");
        document.body.append(newContainer);
        container = newContainer;
    }
    const {
        confirmTitle = "Are you sure?",
        confirmAcceptText = "Accept",
        confirmCancelText = "Cancel",
        confirmDialogContent,
        onCancel,
        onConfirm,
    } = options;

    const closeDialog = () => unmountComponentAtNode(container!);
    const dialog = <Modal open={true} onClose={closeDialog}>
        <Modal.Header>
            {
                typeof confirmTitle === "string"
                    ? <Text h3>
                        {confirmTitle}
                    </Text>
                    : confirmTitle
            }
        </Modal.Header>
        <Modal.Body>
            {confirmDialogContent}
        </Modal.Body>
        <Modal.Footer>
            <Button auto color="secondary" onPress={() => {
                onCancel?.();
                closeDialog();
            }}>
                {confirmCancelText}
            </Button>
            <Button auto ghost color="error" onPress={(e) => {
                action(e);
                onConfirm?.();
                closeDialog();
            }}>
                {confirmAcceptText}
            </Button>
        </Modal.Footer>
    </Modal>;
    // Render dialog component in container.
    render(dialog, container);
};