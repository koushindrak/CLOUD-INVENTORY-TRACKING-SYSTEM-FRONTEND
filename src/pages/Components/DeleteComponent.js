import { call, put, takeLatest, all } from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {createSelector} from "reselect";
import {fromJS} from "immutable";
import {RESET_GET_COMPONENT_BY_ID_STATES} from "./GetComponentById";

export const DELETE_COMPONENT_BY_ID_REQUEST = 'DELETE_COMPONENT_BY_ID_REQUEST';
export const DELETE_COMPONENT_BY_ID_SUCCESS = 'DELETE_COMPONENT_BY_ID_SUCCESS';
export const DELETE_COMPONENT_BY_ID_FAILURE = 'DELETE_COMPONENT_BY_ID_FAILURE';
export const RESET_DELETE_COMPONENT_BY_ID_STATES = 'RESET_DELETE_COMPONENT_BY_ID_STATES';

//2. action
export function deleteComponentById(id) {
    return {
        type: DELETE_COMPONENT_BY_ID_REQUEST,
        id
    }
}

export const deleteGetComponentByIdSates= () => ({
    type: RESET_DELETE_COMPONENT_BY_ID_STATES
});

//3. saga
function* handleDeleteComponentByIdRequest(action){
    yield (apiCallHandler(action, DELETE_COMPONENT_BY_ID_SUCCESS, DELETE_COMPONENT_BY_ID_FAILURE, apis.COMPONENT_APIS_BASE_URL,apiTypes.DELETE_BY_ID));
}
export function* watchDeleteComponentByIdRequest() {
    yield takeLatest(DELETE_COMPONENT_BY_ID_REQUEST,handleDeleteComponentByIdRequest)
}

//4. Reducer
export const initialState = fromJS({});
export function DeleteComponentByIdReducer(state = initialState, action) {
    switch (action.type) {
        case DELETE_COMPONENT_BY_ID_SUCCESS:
            return Object.assign({}, state, {deleteComponentByIdResponse: action.response})

        case DELETE_COMPONENT_BY_ID_FAILURE:
            return Object.assign({}, state, {deleteComponentByIdError: {error: action.error, errorTime: new Date()}})

        case RESET_DELETE_COMPONENT_BY_ID_STATES:
            return Object.assign({}, state, {
                deleteComponentByIdError: null,
                deleteComponentByIdResponse: null,
            })

        default:
            return state;
    }
}

//5. Selector
const deleteComponentByIdSelector = state => state.deleteById || initialState;
export const deleteComponentByIdSuccess = createSelector(deleteComponentByIdSelector,state=>state.deleteComponentByIdResponse)
export const deleteComponentByIdFailure =  createSelector(deleteComponentByIdSelector,state=>state.deleteComponentByIdError)
export {deleteComponentByIdSelector}
