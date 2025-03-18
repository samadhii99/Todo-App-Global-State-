import React from "react";
import { Table, Space, Button, Tooltip, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Todo, TodoPriority } from "../types/todo";

interface TodoTableProps {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const TodoTable: React.FC<TodoTableProps> = ({ todos, onEdit, onDelete }) => {
  // Define table columns with proper TypeScript typing
  const columns: ColumnsType<Todo> = [
    {
      title: "Status",
      dataIndex: "completed",
      key: "completed",
      render: (completed: boolean) => (
        <Tag color={completed ? "success" : "processing"}>
          {completed ? "Completed" : "Pending"}
        </Tag>
      ),
      filters: [
        { text: "Completed", value: true },
        { text: "Pending", value: false },
      ],
      onFilter: (value, record) => record.completed === !!value,
      width: "12%",
    },
    {
      title: "Title",
      dataIndex: "text",
      key: "text",
      sorter: (a, b) => {
        return String(a.text).localeCompare(String(b.text));
      },
      width: "20%",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority: TodoPriority) => {
        const colorMap: Record<TodoPriority, string> = {
          high: "red",
          medium: "orange",
          low: "green",
        };
        return <Tag color={colorMap[priority] || "blue"}>{priority}</Tag>;
      },
      filters: [
        { text: "High", value: "high" },
        { text: "Medium", value: "medium" },
        { text: "Low", value: "low" },
      ],
      onFilter: (value, record) => record.priority === value,
      width: "12%",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString() : "-",
      sorter: (a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      },
      width: "15%",
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      width: "15%",
    },
    {
      title: "Actions",
      key: "actions",
      width: "12%",
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              size="small"
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => onDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={todos.map((todo: Todo) => ({
        ...todo,
        key: todo.id,
      }))}
      columns={columns}
      pagination={{ pageSize: 10 }}
      size="small"
      scroll={{ x: 800 }}
    />
  );
};

export default TodoTable;
