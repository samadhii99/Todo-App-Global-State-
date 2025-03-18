import React from "react";
import {
  Drawer,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Space,
  Typography,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useAppDispatch } from "../../redux/hooks";
import { updateTodo } from "../../redux/todoSlice";
import { Todo } from "../../types/todo";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface EditTodoDrawerProps {
  visible: boolean;
  onClose: () => void;
  todo: Todo | null;
}

const EditTodoDrawer: React.FC<EditTodoDrawerProps> = ({
  visible,
  onClose,
  todo,
}) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (todo) {
      form.setFieldsValue({
        title: todo.title || todo.text,
        description: todo.description || "",
        priority: todo.priority || "medium",
        dueDate: todo.dueDate ? dayjs(todo.dueDate) : undefined,
      });
    }
  }, [todo, form]);

  const handleSubmit = (values: any) => {
    if (todo) {
      dispatch(
        updateTodo({
          id: todo.id,
          title: values.title,
          text: values.title, // Update text field for compatibility
          description: values.description,
          priority: values.priority,
          dueDate: values.dueDate ? values.dueDate.toISOString() : undefined,
          completed: todo.completed,
          createdAt: todo.createdAt,
        })
      );
      onClose();
    }
  };

  return (
    <Drawer
      title={<Title level={4}>Edit Todo</Title>}
      placement="right"
      onClose={onClose}
      open={visible}
      width={500}
      zIndex={1001} /* Add higher zIndex */
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={() => form.submit()}
          >
            Save
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item name="priority" label="Priority">
          <Select>
            <Option value="high">High</Option>
            <Option value="medium">Medium</Option>
            <Option value="low">Low</Option>
          </Select>
        </Form.Item>

        <Form.Item name="dueDate" label="Due Date">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditTodoDrawer;
