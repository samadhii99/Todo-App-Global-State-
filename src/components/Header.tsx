import React from "react";
import { Layout, Space, Typography, Badge, Divider, Switch } from "antd";
import { OrderedListOutlined, CalendarOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setDarkMode } from "../redux/todoSlice";
import { useDarkMode } from "../hooks/useDarkMode";

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todoState.todos);
  const darkMode = useAppSelector((state) => state.todoState.darkMode);
  const { applyDarkMode } = useDarkMode();

  // Get today's date in a readable format
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Toggle dark mode
  const toggleDarkMode = (checked: boolean) => {
    dispatch(setDarkMode(checked));
    applyDarkMode(checked);
    localStorage.setItem("darkMode", checked.toString());
  };

  return (
    <AntHeader
      style={{
        padding: "0 0 24px 0",
        background: "transparent",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Space align="center">
        <OrderedListOutlined style={{ fontSize: "28px", color: "#1890ff" }} />
        <Title level={2} style={{ margin: 0 }}>
          Todo List
        </Title>
        <Badge
          count={todos.filter((todo) => !todo.completed).length}
          style={{ marginLeft: "8px" }}
          overflowCount={99}
        />
      </Space>
      <Space>
        <Text>
          <CalendarOutlined style={{ marginRight: "8px" }} />
          {today}
        </Text>
        <Divider type="vertical" />
        <Switch
          checkedChildren="🌙"
          unCheckedChildren="☀️"
          checked={darkMode}
          onChange={toggleDarkMode}
        />
      </Space>
    </AntHeader>
  );
};

export default Header;
