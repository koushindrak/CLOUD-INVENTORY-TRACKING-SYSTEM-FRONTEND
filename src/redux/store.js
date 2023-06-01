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

let sagaMiddleware = createSagaMiddleware();
const middleware = (getDefaultMiddleware) => [
  ...getDefaultMiddleware({ thunk: false,     serializableCheck: false,
  }),
  sagaMiddleware,

];

const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,
    product: manageProductsReducer, // Add your product reducer here
    category: GetCategoryReducer,

    pcb: GetPcbReducer,
    createPcb: CreatePcbReducer,
    createComponent: CreateComponentReducer,
    component: GetComponentReducer,

    supplier: GetSupplierReducer,
    pcbById: GetPcbByIdReducer

  },
  middleware,
});

sagaMiddleware.run(saga);

export default store;
