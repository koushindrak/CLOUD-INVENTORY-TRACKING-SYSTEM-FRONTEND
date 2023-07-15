import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import manageProductsReducer from "../../src/pages/Products/reducers";
import saga from "./saga";
import {GetCategoryReducer} from "../pages/Products/GetProductCategories";
import {GetPcbReducer} from "../pages/Pcb/GetAllPcb";
import {CreatePcbReducer} from "../pages/Pcb/CreatePcb";
import {CreateComponentReducer} from "../pages/Components/CreateComponent";
import {GetComponentReducer} from "../pages/Components/GetAllComponent";
import {GetSupplierReducer} from "../pages/Suppliers/GetAllSupplier";
import {GetPcbByIdReducer} from "../pages/Pcb/GetPCBById";
import {GetOrderReducer} from "../pages/Orders/GetAllOrders";
import {GetOrderByIdReducer} from "../pages/Orders/GetOrderById";
import {DeletePcbByIdReducer} from "../pages/Pcb/DeletePcb";
import {UpdatePcbReducer} from "../pages/Pcb/UpdatePcb";
import {GetComponentByIdReducer} from "../pages/Components/GetComponentById";
import {DeleteComponentByIdReducer} from "../pages/Components/DeleteComponent";
import {UpdateComponentReducer} from "../pages/Components/UpdateComponent";
import {LoginReducer} from "../pages/Login/Login";
import {InviteUserReducer} from "../pages/Users/InviteUser";
import {GetUserReducer} from "../pages/Users/GetAllUser";
import {GetUserByCodeReducer} from "../pages/Users/GetUserByCode";
import {UpdateUserReducer} from "../pages/Users/UpdateUser";

let sagaMiddleware = createSagaMiddleware();
const middleware = (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
        thunk: false, serializableCheck: false,
    }),
    sagaMiddleware,

];

const store = configureStore({
    reducer: {

        //login
        login: LoginReducer,
        inviteUser: InviteUserReducer,
        user: GetUserReducer,
        userByCode: GetUserByCodeReducer,
        updateUser: UpdateUserReducer,


        //product
        product: manageProductsReducer,

        //category
        category: GetCategoryReducer,

        //pcb
        pcb: GetPcbReducer,
        createPcb: CreatePcbReducer,
        pcbById: GetPcbByIdReducer,
        deletePCBById: DeletePcbByIdReducer,
        updatePcb: UpdatePcbReducer,

        //component
        createComponent: CreateComponentReducer,
        component: GetComponentReducer,
        componentById: GetComponentByIdReducer,
        deleteCompById: DeleteComponentByIdReducer,
        updateComponent: UpdateComponentReducer,
        //supplier
        supplier: GetSupplierReducer,


        //orders
        orders: GetOrderReducer,
        orderById: GetOrderByIdReducer

    },
    middleware,
});

sagaMiddleware.run(saga);

export default store;
