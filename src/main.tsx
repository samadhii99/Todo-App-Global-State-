import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider, theme } from "antd";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import "antd/dist/reset.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1677ff",
            borderRadius: 8,
          },
          algorithm: store.getState().todoState.darkMode
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
