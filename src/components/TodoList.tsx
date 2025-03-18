import React from "react";
import { List } from "antd";
import { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos = [],
  onEdit,
  onDelete,
}) => {
  return (
    <List
      grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
      dataSource={todos}
      renderItem={(todo) => (
        <List.Item>
          <TodoItem
            todo={todo}
            onEditClick={() => onEdit(todo)}
            onDeleteClick={() => onDelete(todo.id)}
          />
        </List.Item>
      )}
    />
  );
};

export default TodoList;
