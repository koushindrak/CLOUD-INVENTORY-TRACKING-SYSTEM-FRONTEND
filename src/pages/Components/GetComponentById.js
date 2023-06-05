import { call, put, takeLatest, all } from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {createSelector} from "reselect";
import {fromJS} from "immutable";
import {RESET_UPDATE_COMPONENT_STATES} from "./UpdateComponent";

export const GET_COMPONENT_BY_ID_REQUEST = 'GET_COMPONENT_BY_ID_REQUEST';
export const GET_COMPONENT_BY_ID_SUCCESS = 'GET_COMPONENT_BY_ID_SUCCESS';
export const GET_COMPONENT_BY_ID_FAILURE = 'GET_COMPONENT_BY_ID_FAILURE';
export const RESET_GET_COMPONENT_BY_ID_STATES = 'RESET_GET_COMPONENT_BY_ID_STATES';

//2. action
export function getComponentById(id) {
    return {
        type: GET_COMPONENT_BY_ID_REQUEST,
        id
    }
}

export const resetGetComponentByIdSates= () => ({
    type: RESET_GET_COMPONENT_BY_ID_STATES
});


//3. saga
function* handleGetComponentByIdRequest(action){
    yield (apiCallHandler(action, GET_COMPONENT_BY_ID_SUCCESS, GET_COMPONENT_BY_ID_FAILURE, apis.COMPONENT_APIS_BASE_URL,apiTypes.GET_BY_ID));
}
export function* watchGetComponentByIdRequest() {
    yield takeLatest(GET_COMPONENT_BY_ID_REQUEST,handleGetComponentByIdRequest)
}

//4. Reducer
export const initialState = fromJS({});
export function GetComponentByIdReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COMPONENT_BY_ID_SUCCESS:
            return Object.assign({}, state, {getComponentByIdResponse: action.response})

        case GET_COMPONENT_BY_ID_FAILURE:
            return Object.assign({}, state, {getComponentByIdError: {error: action.error, errorTime: new Date()}})

        case RESET_GET_COMPONENT_BY_ID_STATES:
            return Object.assign({}, state, {
                getComponentByIdError: null,
                getComponentByIdResponse: null,
            })
        default:
            return state;
    }
}

//5. Selector
const getComponentByIdSelector = state => state.componentById || initialState;
export const getComponentByIdSuccess = createSelector(getComponentByIdSelector,state=>state.getComponentByIdResponse)
export const getComponentByIdFailure =  createSelector(getComponentByIdSelector,state=>state.getComponentByIdError)
export {getComponentByIdSelector}
