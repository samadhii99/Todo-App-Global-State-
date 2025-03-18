import React from "react";
import { Layout } from "antd";
import Header from "../components/Header";
import TodoContent from "../components/TodoContent";
import Footer from "./Footer";

const { Content } = Layout;

const AppLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}
      >
        <TodoContent />
      </Content>
      <Footer />
    </Layout>
  );
};

export default AppLayout;
