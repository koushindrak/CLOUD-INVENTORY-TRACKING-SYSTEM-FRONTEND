import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Page404 from "../pages/Page404";
import COLORS from "../utils/colors";
import Items from "../pages/Items";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: COLORS.primary,
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/items" element={<Items />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
