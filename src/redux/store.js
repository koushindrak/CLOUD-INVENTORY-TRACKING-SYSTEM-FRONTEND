import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { chatSlice } from "../components/ChatForm/chatReducers";
import manageProductsReducer from "../../src/pages/Products/reducers";
import saga from "./saga";
import {GetCategoryReducer} from "../pages/Products/GetProductCategories";

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
    category: GetCategoryReducer
  },
  middleware,
});

sagaMiddleware.run(saga);

export default store;
