import React from "react";
import { ConfigProvider, theme } from "antd";
import { useAppSelector } from "./redux/hooks";
import AppLayout from "./layout/AppLayout";

const App: React.FC = () => {
  const darkMode = useAppSelector((state) => state.todoState.darkMode);

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <AppLayout />
    </ConfigProvider>
  );
};

export default App;
