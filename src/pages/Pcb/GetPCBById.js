import { call, put, takeLatest, all } from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {createSelector} from "reselect";
import {fromJS} from "immutable";

export const GET_PCB_BY_ID_REQUEST = 'GET_PCB_BY_ID_REQUEST';
export const GET_PCB_BY_ID_SUCCESS = 'GET_PCB_BY_ID_SUCCESS';
export const GET_PCB_BY_ID_FAILURE = 'GET_PCB_BY_ID_FAILURE';

//2. action
export function getPcbById(id) {
    return {
        type: GET_PCB_BY_ID_REQUEST,
        id
    }
}

//3. saga
function* handleGetPcbByIdRequest(action){
    yield (apiCallHandler(action, GET_PCB_BY_ID_SUCCESS, GET_PCB_BY_ID_FAILURE, apis.PCB_APIS_BASE_URL,apiTypes.GET_BY_ID));
}
export function* watchGetPcbByIdRequest() {
    yield takeLatest(GET_PCB_BY_ID_REQUEST,handleGetPcbByIdRequest)
}

//4. Reducer
export const initialState = fromJS({});
export function GetPcbByIdReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PCB_BY_ID_SUCCESS:
            return Object.assign({}, state, {getPcbByIdResponse: action.response})

        case GET_PCB_BY_ID_FAILURE:
            return Object.assign({}, state, {getPcbByIdError: {error: action.error, errorTime: new Date()}})
        default:
            return state;
    }
}

//5. Selector
const getPcbByIdSelector = state => state.pcbById || initialState;
export const getPcbByIdSuccess = createSelector(getPcbByIdSelector,state=>state.getPcbByIdResponse)
export const getPcbByIdFailure =  createSelector(getPcbByIdSelector,state=>state.getPcbByIdError)
export {getPcbByIdSelector}
