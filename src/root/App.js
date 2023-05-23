import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page404 from "../pages/Page404";
import COLORS from "../utils/colors";

//NEW
import { useState } from "react";
// import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";
import Dashboard from "../scenes/dashboard";
import Team from "../scenes/team";
import Invoices from "../scenes/invoices";
import Contacts from "../scenes/contacts";
import Bar from "../scenes/bar";
import Form from "../scenes/form";
import Line from "../scenes/line";
import Pie from "../scenes/pie";
import FAQ from "../scenes/faq";
import Geography from "../scenes/geography";
import StaticDateTimePickerLandscape from "../scenes/DateTimePicker";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import Calendar from "../scenes/calendar/calendar";
import Products from "../pages/Products/index";
import EditProduct from "../pages/Products/EditProduct";
import AddProduct from "../pages/Products/AddProduct";
import CollapsibleTable from "../pages/Components";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  // return (
  //   <ConfigProvider
  //     theme={{
  //       token: {
  //         colorPrimary: COLORS.primary,
  //       },
  //     }}
  //   >
  //     <BrowserRouter>
  //       <Routes>
  //         <Route index element={<Home />} />
  //         <Route path="*" element={<Page404 />} />
  //       </Routes>
  //     </BrowserRouter>
  //   </ConfigProvider>
  // );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />  {/* Add this line */}
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            {/*<Topbar setIsSidebar={setIsSidebar} />*/}
            {/*<BrowserRouter>*/}
              <Routes>
                <Route path="/products/add" element={<AddProduct />} />
                <Route path="/products/edit/:id" element={<EditProduct />} />
                <Route path="/" element={<Products />} />
                <Route path="/components" element={<CollapsibleTable />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                {/*<Route path="/bar" element={<Bar />} />*/}
                {/*<Route path="/pie" element={<Pie />} />*/}
                {/*<Route path="/line" element={<Line />} />*/}
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                {/*<Route path="/geography" element={<Geography />} />*/}
                <Route path="/datetimepicker" element={<StaticDateTimePickerLandscape />} />
                <Route path="*" element={<Page404 />} />
              </Routes>
            {/*</BrowserRouter>*/}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
