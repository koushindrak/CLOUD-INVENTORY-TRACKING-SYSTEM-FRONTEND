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
import {watchGetOrderByIdRequest} from "../pages/Orders/GetOrderById";
import {watchDeletePcbByIdRequest} from "../pages/Pcb/DeletePcb";
import {watchUpdatePcbRequest} from "../pages/Pcb/UpdatePcb";
import {watchGetComponentByIdRequest} from "../pages/Components/GetComponentById";
import {watchDeleteComponentByIdRequest} from "../pages/Components/DeleteComponent";
import {watchUpdateComponentRequest} from "../pages/Components/UpdateComponent";

export let callAPI = async ({ url, method, data }) => {
  return await Axios({url, method, data});
};

export default function* rootSaga() {
  yield all([
      fetchMessageWatcher(),

      //product
      productSaga(),

      //category
      watchGetCategoryRequest(),

      //component
      watchCreateComponentRequest(),
      watchGetComponentRequest(),
      watchGetComponentByIdRequest(),
      watchDeleteComponentByIdRequest(),
      watchUpdateComponentRequest(),

      //supplier
      watchGetSupplierRequest(),

      //pcb
      watchCreatePcbRequest(),
      watchGetPcbRequest(),
      watchGetPcbByIdRequest(),
      watchDeletePcbByIdRequest(),
      watchUpdatePcbRequest(),

      //order
      watchGetOrderRequest(),
      watchGetOrderByIdRequest()


  ]);
}
