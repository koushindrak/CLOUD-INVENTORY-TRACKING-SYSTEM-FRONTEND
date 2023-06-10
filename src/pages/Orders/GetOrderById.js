import {takeLatest} from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {createSelector} from "reselect";
import {fromJS} from "immutable";

export const GET_ORDER_BY_ID_REQUEST = 'GET_ORDER_BY_ID_REQUEST';
export const GET_ORDER_BY_ID_SUCCESS = 'GET_ORDER_BY_ID_SUCCESS';
export const GET_ORDER_BY_ID_FAILURE = 'GET_ORDER_BY_ID_FAILURE';

//2. action
export function getOrderById(id) {
    return {
        type: GET_ORDER_BY_ID_REQUEST,
        id
    }
}

//3. saga
function* handleGetOrderByIdRequest(action){
    yield (apiCallHandler(action, GET_ORDER_BY_ID_SUCCESS, GET_ORDER_BY_ID_FAILURE, apis.ORDER_APIS_BASE_URL,apiTypes.GET_BY_ID));
}
export function* watchGetOrderByIdRequest() {
    yield takeLatest(GET_ORDER_BY_ID_REQUEST,handleGetOrderByIdRequest)
}

//4. Reducer
export const initialState = fromJS({});
export function GetOrderByIdReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ORDER_BY_ID_SUCCESS:
            return Object.assign({}, state, {getOrderByIdResponse: action.response})

        case GET_ORDER_BY_ID_FAILURE:
            return Object.assign({}, state, {getOrderByIdError: {error: action.error, errorTime: new Date()}})
        default:
            return state;
    }
}

//5. Selector
const getOrderByIdSelector = state => state.orderById || initialState;
export const getOrderByIdSuccess = createSelector(getOrderByIdSelector,state=>state.getOrderByIdResponse)
export const getOrderByIdFailure =  createSelector(getOrderByIdSelector,state=>state.getOrderByIdError)
export {getOrderByIdSelector}
