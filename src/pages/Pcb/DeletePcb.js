import { call, put, takeLatest, all } from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {createSelector} from "reselect";
import {fromJS} from "immutable";

export const DELETE_PCB_BY_ID_REQUEST = 'DELETE_PCB_BY_ID_REQUEST';
export const DELETE_PCB_BY_ID_SUCCESS = 'DELETE_PCB_BY_ID_SUCCESS';
export const DELETE_PCB_BY_ID_FAILURE = 'DELETE_PCB_BY_ID_FAILURE';

//2. action
export function deletePcbById(id) {
    return {
        type: DELETE_PCB_BY_ID_REQUEST,
        id
    }
}

//3. saga
function* handleDeletePcbByIdRequest(action){
    yield (apiCallHandler(action, DELETE_PCB_BY_ID_SUCCESS, DELETE_PCB_BY_ID_FAILURE, apis.PCB_APIS_BASE_URL,apiTypes.DELETE_BY_ID));
}
export function* watchDeletePcbByIdRequest() {
    yield takeLatest(DELETE_PCB_BY_ID_REQUEST,handleDeletePcbByIdRequest)
}

//4. Reducer
export const initialState = fromJS({});
export function DeletePcbByIdReducer(state = initialState, action) {
    switch (action.type) {
        case DELETE_PCB_BY_ID_SUCCESS:
            return Object.assign({}, state, {deletePcbByIdResponse: action.response})

        case DELETE_PCB_BY_ID_FAILURE:
            return Object.assign({}, state, {deletePcbByIdError: {error: action.error, errorTime: new Date()}})
        default:
            return state;
    }
}

//5. Selector
const deletePcbByIdSelector = state => state.deleteById || initialState;
export const deletePcbByIdSuccess = createSelector(deletePcbByIdSelector,state=>state.deletePcbByIdResponse)
export const deletePcbByIdFailure =  createSelector(deletePcbByIdSelector,state=>state.deletePcbByIdError)
export {deletePcbByIdSelector}
