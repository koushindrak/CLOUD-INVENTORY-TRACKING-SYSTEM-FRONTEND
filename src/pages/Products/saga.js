import { take, takeEvery,call, put, select } from 'redux-saga/effects';
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import * as CONSTANTS from "./constants";

export function* handleCreateProductRequest(action) {
  yield (apiCallHandler(action, CONSTANTS.CREATE_PRODUCT_SUCCESS, CONSTANTS.CREATE_PRODUCT_FAILURE, apis.PRODUCT_APIS_BASE_URL,apiTypes.CREATE));
}
export function* watchCreateProductRequest() {
  yield takeEvery(CONSTANTS.CREATE_PRODUCT,handleCreateProductRequest)
}

export function* handleGetProductRequest(action) {
  console.log("----111handleGetProductRequest")
  yield (apiCallHandler(action, CONSTANTS.GET_PRODUCTS_SUCCESS, CONSTANTS.GET_PRODUCTS_FAILURE, apis.PRODUCT_APIS_BASE_URL,apiTypes.GET_ALL));
}
export function* watchGetProductRequest() {
  console.log("saga---1111watchGetProductRequest")
  yield takeEvery(CONSTANTS.GET_PRODUCTS,handleGetProductRequest)
}


export function* handleGetProductByIdRequest(action) {
  yield (apiCallHandler(action, CONSTANTS.GET_PRODUCT_BY_ID_SUCCESS, CONSTANTS.GET_PRODUCT_BY_ID_FAILURE, apis.PRODUCT_APIS_BASE_URL,apiTypes.GET_BY_ID));
}
export function* watchGetProductByIdRequest() {
  yield takeEvery(CONSTANTS.GET_PRODUCT_BY_ID,handleGetProductByIdRequest)
}

export function* handleUpdateProductRequest(action) {
  yield (apiCallHandler(action, CONSTANTS.UPDATE_PRODUCT_SUCCESS, CONSTANTS.UPDATE_PRODUCT_FAILURE, apis.PRODUCT_APIS_BASE_URL,apiTypes.UPDATE_BY_ID));
}
export function* watchUpdateProductRequest() {
  yield takeEvery(CONSTANTS.UPDATE_PRODUCT,handleUpdateProductRequest)
}

export function* handleDeleteProductRequest(action) {
  yield (apiCallHandler(action, CONSTANTS.DELETE_PRODUCT_SUCCESS, CONSTANTS.DELETE_PRODUCT_FAILURE, apis.PRODUCT_APIS_BASE_URL,apiTypes.DELETE_BY_ID));
}
export function* watchDeleteProductRequest() {
  yield takeEvery(CONSTANTS.DELETE_PRODUCT,handleDeleteProductRequest)
}
export default function* defaultSaga() {
  yield [
    // watchCreateProductRequest(),
    watchGetProductRequest(),
    watchGetProductByIdRequest(),
    watchUpdateProductRequest(),
    watchDeleteProductRequest(),
  ]
}
