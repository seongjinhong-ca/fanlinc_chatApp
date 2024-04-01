import ConfirmModal from "../components/ConfirmModal";
import { createConfirmation } from "react-confirm";

const defaultConfirmation = createConfirmation(ConfirmModal);

// options can take in title, okLabel, cancelLabel

export const confirm = (confirmation: string, options = {}) => {
  return defaultConfirmation({ confirmation, ...options });
};
