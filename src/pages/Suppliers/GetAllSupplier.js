import { call, put, takeLatest, all } from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {createSelector} from "reselect";
import {fromJS} from "immutable";

export const GET_SUPPLIER_REQUEST = 'GET_SUPPLIER_REQUEST';
export const GET_SUPPLIER_SUCCESS = 'GET_SUPPLIER_SUCCESS';
export const GET_SUPPLIER_FAILURE = 'GET_SUPPLIER_FAILURE';

//2. action
export function getSupplier() {
    console.log("Action---getSupplier")
    return {
        type: GET_SUPPLIER_REQUEST
    }
}

//3. saga
function* handleGetSupplierRequest(action){
    console.log("---saga--- handleGetsupplierRequest---")
    yield (apiCallHandler(action, GET_SUPPLIER_SUCCESS, GET_SUPPLIER_FAILURE, apis.SUPPLIER_APIS_BASE_URL,apiTypes.GET_ALL));
}
export function* watchGetSupplierRequest() {
    yield takeLatest(GET_SUPPLIER_REQUEST,handleGetSupplierRequest)
}

//4. Reducer
export const initialState = fromJS({});
export function GetSupplierReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SUPPLIER_SUCCESS:
            console.log("GET_SUPPLIER_SUCCESS---",action.response)
            return Object.assign({}, state, {getSupplierResponse: action.response})

        case GET_SUPPLIER_FAILURE:
            return Object.assign({}, state, {getSupplierError: {error: action.error, errorTime: new Date()}})
        default:
            return state;
    }
}

//5. Selector
const getSupplierSelector = state => state.supplier || initialState;
export const getSupplierSuccess = createSelector(getSupplierSelector,state=>state.getSupplierResponse)
export const getSupplierFailure =  createSelector(getSupplierSelector,state=>state.getSupplierError)
export {getSupplierSelector}
