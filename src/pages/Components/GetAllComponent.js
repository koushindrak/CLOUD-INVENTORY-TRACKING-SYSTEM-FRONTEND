import { call, put, takeLatest, all } from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {createSelector} from "reselect";
import {fromJS} from "immutable";

export const GET_COMPONENT_REQUEST = 'GET_COMPONENT_REQUEST';
export const GET_COMPONENT_SUCCESS = 'GET_COMPONENT_SUCCESS';
export const GET_COMPONENT_FAILURE = 'GET_COMPONENT_FAILURE';

//2. action
export function getComponent() {
    console.log("Action---getComponent")
    return {
        type: GET_COMPONENT_REQUEST
    }
}

//3. saga
function* handleGetComponentRequest(action){
    console.log("---saga--- handleGetcomponentRequest---")
    yield (apiCallHandler(action, GET_COMPONENT_SUCCESS, GET_COMPONENT_FAILURE, apis.COMPONENT_APIS_BASE_URL,apiTypes.GET_ALL));
}
export function* watchGetComponentRequest() {
    yield takeLatest(GET_COMPONENT_REQUEST,handleGetComponentRequest)
}

//4. Reducer
export const initialState = fromJS({});
export function GetComponentReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COMPONENT_SUCCESS:
            console.log("GET_COMPONENT_SUCCESS---",action.response)
            return Object.assign({}, state, {getComponentResponse: action.response})

        case GET_COMPONENT_FAILURE:
            return Object.assign({}, state, {getComponentError: {error: action.error, errorTime: new Date()}})
        default:
            return state;
    }
}

//5. Selector
const getComponentSelector = state => state.component || initialState;
export const getComponentSuccess = createSelector(getComponentSelector,state=>state.getComponentResponse)
export const getComponentFailure =  createSelector(getComponentSelector,state=>state.getComponentError)
export {getComponentSelector}
