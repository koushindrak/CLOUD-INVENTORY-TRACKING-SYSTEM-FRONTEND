import { all } from "redux-saga/effects";
import Axios from "axios";
import { fetchMessageWatcher } from "../components/ChatForm/chatSagas";
import productSaga  from '../pages/Products/saga';
import {watchGetCategoryRequest} from "../pages/Products/GetProductCategories";
import {watchGetPcbRequest} from "../pages/Pcb/GetAllPcb";
import {watchCreatePcbRequest} from "../pages/Pcb/CreatePcb";
import {watchCreateComponentRequest} from "../pages/Components/CreateComponent";
import {watchGetComponentRequest} from "../pages/Components/GetAllComponent";
import {watchGetSupplierRequest} from "../pages/Suppliers/GetAllSupplier";
import {watchGetPcbByIdRequest} from "../pages/Pcb/GetPCBById";
import {watchGetOrderRequest} from "../pages/Orders/GetAllOrders";

export let callAPI = async ({ url, method, data }) => {
  return await Axios({url, method, data});
};

export default function* rootSaga() {
  yield all([
      fetchMessageWatcher(),
      productSaga(),
      watchGetCategoryRequest(),
      watchGetPcbRequest(),
      watchCreatePcbRequest(),

      watchCreateComponentRequest(),
      watchGetComponentRequest(),

      watchGetSupplierRequest(),
      watchGetPcbByIdRequest(),

      watchGetOrderRequest()
  ]);
}
