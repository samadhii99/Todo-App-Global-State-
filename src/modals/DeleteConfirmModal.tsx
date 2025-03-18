import React from "react";
import { Modal } from "antd";
import { useAppDispatch } from "../redux/hooks";
import { deleteTodo } from "../redux/todoSlice";

interface DeleteConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  todoId: string | null;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  visible,
  onClose,
  todoId,
}) => {
  const dispatch = useAppDispatch();

  const handleDeleteConfirm = () => {
    if (todoId) {
      // Directly delete the todo without prompting again
      dispatch(deleteTodo(todoId));
      onClose();
    }
  };

  return (
    <Modal
      title="Confirm Delete"
      open={visible}
      onCancel={onClose}
      onOk={handleDeleteConfirm}
      okText="Delete"
      cancelText="Cancel"
      zIndex={2000} // Higher z-index than the drawer
    >
      Are you sure you want to delete this todo? This action cannot be undone.
    </Modal>
  );
};

export default DeleteConfirmModal;
