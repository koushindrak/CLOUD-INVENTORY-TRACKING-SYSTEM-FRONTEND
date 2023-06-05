import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { chatSlice } from "../components/ChatForm/chatReducers";
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

let sagaMiddleware = createSagaMiddleware();
const middleware = (getDefaultMiddleware) => [
  ...getDefaultMiddleware({ thunk: false,     serializableCheck: false,
  }),
  sagaMiddleware,

];

const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,

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
