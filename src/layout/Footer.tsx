import React from "react";
import { Layout, Space, Divider, Typography, Tag } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

const Footer: React.FC = () => {
  return (
    <AntFooter
      style={{
        textAlign: "center",
        background: "transparent",
      }}
    >
      <Space split={<Divider type="vertical" />}>
        <Text>Todo App ©{new Date().getFullYear()}</Text>
        <Text>Created with Ant Design</Text>
        <Tag icon={<ClockCircleOutlined />} color="processing">
          Last updated: {new Date().toLocaleDateString()}
        </Tag>
      </Space>
    </AntFooter>
  );
};

export default Footer;
