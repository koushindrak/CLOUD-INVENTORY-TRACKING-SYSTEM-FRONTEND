import { ConfigProvider } from "antd";
import Home from "../pages/Home";
import Page404 from "../pages/Page404";
import COLORS from "../utils/colors";
import Items from "../pages/Items";
import ItemView from "../pages/Items/View";
import React from "react";
import ItemEdit from "../pages/Items/Edit";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <React.StrictMode>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: COLORS.primary,
          },
        }}
      >
        <BrowserRouter>
          <Routes>
            {/* <Route index path="/" element={<Home />} /> */}
            <Route path="items" element={<Items />}>
              <Route path="view" element={<ItemView />} />
              <Route path="edit" element={<ItemEdit />} />
            </Route>
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </React.StrictMode>
  );
}

export default App;
