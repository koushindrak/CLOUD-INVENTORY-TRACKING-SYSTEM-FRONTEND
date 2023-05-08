import React from "react";
import ReactDOM from "react-dom/client";
import App from "./root/App";
import { Provider } from "react-redux";
import reportWebVitals from "./utils/reportWebVitals";
import "./root/index.css";
import store from "./redux/store";
import COLORS from "./utils/colors";

import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: COLORS.primary,
          },
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
