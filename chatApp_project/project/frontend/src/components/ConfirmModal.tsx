import React from "react";
import { confirmable } from "react-confirm";
import { Modal, Button } from "react-bootstrap";

export type ConfirmModalType = {
  okLabel: string;
  cancelLabel: string;
  title: string;
  confirmation: string;
  show: boolean;
  proceed: () => void;
  cancel: () => void;
  dismiss: () => void;
  enableEscape: boolean;
};

const ConfirmModal: React.FC<ConfirmModalType> = ({
  okLabel = "Yes",
  cancelLabel = "No",
  title = "Confirmation",
  confirmation = "Are you sure?",
  cancel,
  show,
  proceed,
  dismiss,
  enableEscape = true
}) => {
  return (
    <Modal
      show={show}
      onHide={dismiss}
      backdrop={enableEscape ? true : "static"}
      keyboard={enableEscape}
    >
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{confirmation}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cancel}>
          {cancelLabel}
        </Button>
        <Button onClick={proceed}>{okLabel}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default confirmable(ConfirmModal);
