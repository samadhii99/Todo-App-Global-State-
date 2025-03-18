import React, { useState } from "react";
import { Card, Alert, Divider } from "antd";
import { useAppSelector } from "../redux/hooks";
import Header from "./Header";
import TodoForm from "./TodoForm";
import Statistics from "./Statistics";
import ActionBar from "./ActionBar";
import TodoList from "./TodoList";
import TodoTable from "./TodoTable";
import FullTableDrawer from "./drawers/FullTableDrawer";
import EditTodoDrawer from "./drawers/EditTodoDrawer";
import DeleteConfirmModal from "../modals/DeleteConfirmModal";
import { Todo } from "../types/todo";

const TodoContent: React.FC = () => {
  const todos = useAppSelector((state) => state.todoState.todos);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);

  // Drawer states
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [editDrawerVisible, setEditDrawerVisible] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  // Delete modal state
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);

  // Filter todos by priority
  const filteredTodos = priorityFilter
    ? todos.filter((todo: Todo) => todo.priority === priorityFilter)
    : todos;

  // Handle edit todo
  const handleEditTodo = (todo: Todo) => {
    setCurrentTodo(todo);
    setEditDrawerVisible(true);
  };

  // Handle delete todo
  const handleDeleteTodo = (id: string) => {
    setTodoToDelete(id);
    setDeleteModalVisible(true);
  };

  return (
    <Card>
      {errorMessage && (
        <Alert
          message={errorMessage}
          type="error"
          closable
          onClose={() => setErrorMessage("")}
        />
      )}

      <Header />
      <TodoForm setErrorMessage={setErrorMessage} />
      <Statistics todos={todos} />

      <Divider />

      <ActionBar
        viewMode={viewMode}
        setViewMode={setViewMode}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        onShowFullTable={() => setDrawerVisible(true)}
      />

      {todos.length === 0 ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          Your todo list is empty
        </div>
      ) : (
        <>
          {viewMode === "card" ? (
            <TodoList
              todos={filteredTodos}
              onEdit={handleEditTodo}
              onDelete={handleDeleteTodo}
            />
          ) : (
            <TodoTable
              todos={filteredTodos}
              onEdit={handleEditTodo}
              onDelete={handleDeleteTodo}
            />
          )}
        </>
      )}

      <FullTableDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        todos={todos}
        onEdit={handleEditTodo}
        onDelete={handleDeleteTodo}
      />

      <EditTodoDrawer
        visible={editDrawerVisible}
        onClose={() => setEditDrawerVisible(false)}
        todo={currentTodo}
      />

      <DeleteConfirmModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        todoId={todoToDelete}
      />
    </Card>
  );
};

export default TodoContent;
