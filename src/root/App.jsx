import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Items from "../pages/Items";
import ItemView from "../pages/Items/View";
import ItemEdit from "../pages/Items/Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/items">
          <Route index element={<Items />} />
          <Route path="view" element={<ItemView />} />
          <Route path="edit" element={<ItemEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
