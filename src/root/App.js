import {Route, Routes, useLocation} from "react-router-dom";
import Page404 from "../pages/Page404";

//NEW
import {useState} from "react";
import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";
import Invoices from "../scenes/invoices";
import Contacts from "../scenes/contacts";
import Form from "../scenes/form";
import FAQ from "../scenes/faq";
import StaticDateTimePickerLandscape from "../scenes/DateTimePicker";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {ColorModeContext, useMode} from "../theme";
import Calendar from "../scenes/calendar/calendar";
import Products from "../pages/Products/index";
import EditProduct from "../pages/Products/EditProduct";
import AddProduct from "../pages/Products/AddProduct";
import Components from "../pages/Components";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import Pcb from "../pages/Pcb";
import AddPcb from "../pages/Pcb/CreatePcbPage";
import AddComponent from "../pages/Components/CreateComponentPage";
import Supplier from "../pages/Suppliers";
import LoginPage from "../pages/Login/LoginPage";
import ResetPassword from "../pages/Password/newPass";
import ForgotPassword from "../pages/Password/forgotPass";
import UpdatePcbPage from "../pages/Pcb/UpdatePcbPage";
import Orders from "../pages/Orders";
import GetOrderByIdPage from "../pages/Orders/GetOrderByIdPage";
import UpdateComponentPage from "../pages/Components/UpdateComponentPage";
import Users from "../pages/Users";
import User from "../pages/Users";
import UpdateUserPage from "../pages/Users/UpdateUserPage";
import AddUser from "../pages/Users/CreateUserPage";
import RegisterUserPage from "../pages/Users/RegisterUserPage";
import ComponentsSourcing from "../pages/ComponentsSourcing";

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

    const location = useLocation();
    const isLoginPage = location.pathname === '/';
    const isForgotPasswordPage = location.pathname === '/forgot-pass';
    const isResetPasswordPage = location.pathname === '/new-pass';
    const isRegisterPage = location.pathname.startsWith('/users/register/')

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <ToastContainer/> {/* Add this line */}
                <div className="app" style={{ overflowX: 'hidden' }}>

                    {!isLoginPage
                        && !isForgotPasswordPage
                        && !isResetPasswordPage
                        && !isRegisterPage
                        && <Sidebar isSidebar={isSidebar}/>

                    }
                    <main className="content">
                        {!isLoginPage
                            && !isForgotPasswordPage
                            && !isResetPasswordPage
                            && !isRegisterPage
                            && <Topbar setIsSidebar={setIsSidebar}/>}
                        {/*<BrowserRouter>*/}
                        <Routes>
                            <Route path="/" element={<LoginPage/>}/>
                            <Route path="/forgot-pass" element={<ForgotPassword/>}/>
                            <Route path="/new-pass" element={<ResetPassword/>}/>
                            <Route path="/users/register/:code" element={<RegisterUserPage/>}/>

                            <Route path="/users" element={<User/>}/>
                            <Route path="/users/edit/:userId" element={<UpdateUserPage/>}/>
                            <Route path="/users/add" element={<AddUser/>}/>

                            <Route path="/orders" element={<Orders/>}/>
                            <Route path="/orders/:id/details" element={<GetOrderByIdPage/>}/>

                            {/*create product  */}
                            <Route path="/products/add" element={<AddProduct/>}/>

                            {/*update product */}
                            <Route path="/products/edit/:id" element={<EditProduct/>}/>

                            {/*get all products */}
                            <Route path="/products" element={<Products/>}/>

                            {/*get all pcbs for a product */}
                            <Route path="/products/:productId/pcbs" element={<Pcb/>}/>

                            {/*add new pcb to a product */}
                            <Route path="/products/:productId/pcbs/add" element={<AddPcb/>}/>

                            {/*edit an existing pcb for a product */}
                            <Route path="/products/:productId/pcbs/edit/:pcbId" element={<UpdatePcbPage/>}/>


                            {/*create pcb  */}
                            <Route path="/pcbs/add" element={<AddPcb/>}/>

                            {/*update pcb  */}
                            <Route path="/pcbs/edit/:pcbId" element={<UpdatePcbPage/>}/>

                            {/*retrieve pcb  */}
                            <Route path="/pcbs" element={<Pcb/>}/>

                            <Route path="/components/edit/:componentId" element={<UpdateComponentPage/>}/>
                            <Route path="/components/add" element={<AddComponent/>}/>
                            <Route path="/components" element={<Components/>}/>
                            <Route path="/components/alerts" element={<Components/>}/>


                            {/*get all pcbs for a component */}
                            <Route path="/components/:componentId/pcbs" element={<Pcb/>}/>

                            {/*add new pcb to a component */}
                            <Route path="/components/:componentId/pcbs/add" element={<AddPcb/>}/>

                            <Route path="/suppliers" element={<Supplier/>}/>

                            <Route path="/sourcing" element={<ComponentsSourcing/>}/>
                            <Route path="/sourcing/:mfrptn" element={<ComponentsSourcing/>}/>
                            <Route path="/contacts" element={<Contacts/>}/>
                            <Route path="/invoices" element={<Invoices/>}/>
                            <Route path="/form" element={<Form/>}/>
                            {/*<Route path="/bar" element={<Bar />} />*/}
                            {/*<Route path="/pie" element={<Pie />} />*/}
                            {/*<Route path="/line" element={<Line />} />*/}
                            <Route path="/faq" element={<FAQ/>}/>
                            <Route path="/calendar" element={<Calendar/>}/>
                            {/*<Route path="/geography" element={<Geography />} />*/}
                            <Route path="/datetimepicker" element={<StaticDateTimePickerLandscape/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                        {/*</BrowserRouter>*/}
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
