import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Page404 from "../pages/Page404";
import COLORS from "../utils/colors";
import Items from "../pages/Items";
import ItemView from "../pages/Items/View";
import React from "react";
import ItemEdit from "../pages/Items/Edit";
import { createBrowserRouter, RouterProvider, createRoutesFromElements } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route redirect="/">
      <Route index element={<Home />} />
      <Route path="/items" element={<Items />} />
      <Route path="/items/view" element={<ItemView />} />
      <Route path="/items/edit" element={<ItemEdit />} />
      <Route path="*" element={<Page404 />} />
    </Route>
  )
);

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
        <RouterProvider router={router} />
      </ConfigProvider>
    </React.StrictMode>
  );
}

export default App;
