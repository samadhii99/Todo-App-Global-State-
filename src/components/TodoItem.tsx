import React, { useState } from "react";
import { Todo } from "../types/todo";
import { useAppDispatch } from "../redux/hooks";
import { toggleComplete, updateTodo } from "../redux/todoSlice";
import {
  Card,
  Checkbox,
  Typography,
  Space,
  Button,
  Input,
  Tooltip,
  Select,
  Tag,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CloseCircleOutlined,
  FlagOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface TodoItemProps {
  todo: Todo;
  onEditClick?: (todo: Todo) => void;
  onDeleteClick?: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onEditClick,
  onDeleteClick,
}) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title || todo.text);
  const [editDescription, setEditDescription] = useState(
    todo.description || ""
  );
  const [editPriority, setEditPriority] = useState<"high" | "medium" | "low">(
    (todo.priority as "high" | "medium" | "low") || "medium"
  );

  const handleToggleComplete = () => {
    dispatch(toggleComplete(todo.id));
  };

  const handleDelete = () => {
    if (onDeleteClick) {
      // Use the parent's delete handler without showing local confirmation
      onDeleteClick(todo.id);
    }
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      dispatch(
        updateTodo({
          id: todo.id,
          title: editTitle,
          text: editTitle, // Update text field for compatibility
          description: editDescription,
          priority: editPriority,
          completed: todo.completed,
          createdAt: todo.createdAt,
          dueDate: todo.dueDate,
        })
      );
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title || todo.text);
    setEditDescription(todo.description || "");
    setEditPriority((todo.priority as "high" | "medium" | "low") || "medium");
    setIsEditing(false);
  };

  // Handle edit click from parent component
  const handleEditClick = () => {
    if (onEditClick) {
      onEditClick(todo);
    } else {
      setIsEditing(true);
    }
  };

  // Priority color mapping
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <Card
      size="small"
      style={{
        borderLeft: todo.completed
          ? "4px solid #52c41a"
          : `4px solid ${
              getPriorityColor(todo.priority) === "error"
                ? "#ff4d4f"
                : getPriorityColor(todo.priority) === "warning"
                ? "#faad14"
                : "#52c41a"
            }`,
        transition: "all 0.3s",
        opacity: todo.completed ? 0.7 : 1,
      }}
      actions={
        isEditing
          ? [
              <Tooltip title="Save">
                <Button
                  type="text"
                  icon={<SaveOutlined />}
                  onClick={handleSave}
                />
              </Tooltip>,
              <Tooltip title="Cancel">
                <Button
                  type="text"
                  icon={<CloseCircleOutlined />}
                  onClick={handleCancel}
                />
              </Tooltip>,
            ]
          : [
              <Tooltip title="Edit">
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={handleEditClick}
                />
              </Tooltip>,
              <Tooltip title="Delete">
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={handleDelete}
                />
              </Tooltip>,
            ]
      }
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
        <Checkbox
          checked={todo.completed}
          onChange={handleToggleComplete}
          style={{ marginTop: "4px" }}
        />
        <div style={{ flex: 1 }}>
          {isEditing ? (
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Task title"
              />
              <TextArea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description (optional)"
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
              <Select
                value={editPriority}
                onChange={(value: "high" | "medium" | "low") =>
                  setEditPriority(value)
                }
                style={{ width: "100%" }}
              >
                <Option value="high">High Priority</Option>
                <Option value="medium">Medium Priority</Option>
                <Option value="low">Low Priority</Option>
              </Select>
            </Space>
          ) : (
            <>
              <Text
                strong
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  opacity: todo.completed ? 0.7 : 1,
                  display: "block",
                  fontSize: "16px",
                }}
              >
                {todo.title || todo.text}
              </Text>
              {todo.description && (
                <Paragraph
                  style={{
                    margin: "4px 0 0 0",
                    opacity: todo.completed ? 0.6 : 0.85,
                    fontSize: "14px",
                  }}
                >
                  {todo.description}
                </Paragraph>
              )}
              <div style={{ marginTop: "8px" }}>
                <Space size={4} wrap>
                  <Tag color={getPriorityColor(todo.priority)}>
                    <FlagOutlined /> {todo.priority}
                  </Tag>

                  {todo.dueDate && (
                    <Tooltip title="Due date">
                      <Tag icon={<CalendarOutlined />}>
                        {new Date(todo.dueDate).toLocaleDateString()}
                      </Tag>
                    </Tooltip>
                  )}

                  <Tooltip title="Created at">
                    <Tag icon={<ClockCircleOutlined />}>
                      {new Date(todo.createdAt).toLocaleDateString()}
                    </Tag>
                  </Tooltip>
                </Space>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TodoItem;
