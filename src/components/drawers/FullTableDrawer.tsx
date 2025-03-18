import React from "react";
import { Drawer, Button, Space, Typography, Table } from "antd";
import { Todo } from "../../types/todo";
import TodoTable from "../TodoTable";

const { Title, Text } = Typography;

interface FullTableDrawerProps {
  visible: boolean;
  onClose: () => void;
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const FullTableDrawer: React.FC<FullTableDrawerProps> = ({
  visible,
  onClose,
  todos,
  onEdit,
  onDelete,
}) => {
  const completedTasks = todos.filter((todo) => todo.completed).length;

  return (
    <Drawer
      title={
        <div>
          <Title level={4}>All Tasks</Title>
          <Text type="secondary">
            {todos.length} tasks ({completedTasks} completed)
          </Text>
        </div>
      }
      placement="right"
      onClose={onClose}
      open={visible}
      width={800}
      zIndex={1000} /* Add explicit zIndex */
      extra={<Button onClick={onClose}>Close</Button>}
    >
      <TodoTable todos={todos} onEdit={onEdit} onDelete={onDelete} />
    </Drawer>
  );
};

export default FullTableDrawer;
