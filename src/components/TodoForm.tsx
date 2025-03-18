import React from "react";
import { useAppDispatch } from "../redux/hooks";
import { addTodo } from "../redux/todoSlice";
import { Form, Input, Button, Select, DatePicker } from "antd";
import {
  PlusOutlined,
  FileTextOutlined,
  FlagOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Todo } from "../types/todo";

const { TextArea } = Input;
const { Option } = Select;

interface TodoFormProps {
  setErrorMessage: (message: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ setErrorMessage }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const handleAddTodo = (values: any) => {
    if (!values.title || !values.title.trim()) {
      setErrorMessage("Title cannot be empty.");
      return;
    }
    setErrorMessage("");

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: values.title,
      text: values.title, // Adding text field for compatibility
      description: values.description || "",
      completed: false,
      priority: values.priority || "medium",
      createdAt: new Date().toISOString(),
      dueDate: values.dueDate ? values.dueDate.toISOString() : undefined,
    };

    dispatch(addTodo(newTodo));
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleAddTodo}
      initialValues={{ priority: "medium" }}
    >
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Title cannot be empty" }]}
      >
        <Input
          placeholder="What needs to be done?"
          prefix={<PlusOutlined />}
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="description"
        label={
          <span>
            <FileTextOutlined style={{ marginRight: "8px" }} />
            Description
          </span>
        }
      >
        <TextArea
          placeholder="Add details (optional)"
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
      </Form.Item>
      <Form.Item
        name="priority"
        label={
          <span>
            <FlagOutlined style={{ marginRight: "8px" }} />
            Priority
          </span>
        }
      >
        <Select>
          <Option value="high">High</Option>
          <Option value="medium">Medium</Option>
          <Option value="low">Low</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="dueDate"
        label={
          <span>
            <CalendarOutlined style={{ marginRight: "8px" }} />
            Due Date (Optional)
          </span>
        }
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          icon={<PlusOutlined />}
        >
          Add Todo
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TodoForm;
