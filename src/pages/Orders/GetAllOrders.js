import {takeLatest} from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {createSelector} from "reselect";
import {fromJS} from "immutable";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILURE = 'GET_ORDER_FAILURE';

//2. action
export function getOrder() {
    return {
        type: GET_ORDER_REQUEST
    }
}

//3. saga
function* handleGetOrderRequest(action){
    yield (apiCallHandler(action, GET_ORDER_SUCCESS, GET_ORDER_FAILURE, apis.ORDER_APIS_BASE_URL,apiTypes.GET_ALL));
}
export function* watchGetOrderRequest() {
    yield takeLatest(GET_ORDER_REQUEST,handleGetOrderRequest)
}

//4. Reducer
export const initialState = fromJS({});
export function GetOrderReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ORDER_SUCCESS:
            return Object.assign({}, state, {getOrderResponse: action.response})

        case GET_ORDER_FAILURE:
            return Object.assign({}, state, {getOrderError: {error: action.error, errorTime: new Date()}})
        default:
            return state;
    }
}

//5. Selector
const getOrderSelector = state => state.orders || initialState;
export const getOrderSuccess = createSelector(getOrderSelector,state=>state.getOrderResponse)
export const getOrderFailure =  createSelector(getOrderSelector,state=>state.getOrderError)
export {getOrderSelector}
