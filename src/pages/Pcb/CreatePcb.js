import { call, put, takeLatest, all } from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {createSelector} from "reselect";
import {fromJS} from "immutable";
import * as CONSTANTS from "../Products/constants";
import {updatePcbSuccess} from "./UpdatePcb";

export const CREATE_PCB_REQUEST = 'CREATE_PCB_REQUEST';
export const CREATE_PCB_SUCCESS = 'CREATE_PCB_SUCCESS';
export const CREATE_PCB_FAILURE = 'CREATE_PCB_FAILURE';
export const RESET_CREATE_PCB_STATES = 'RESET_CREATE_PCB_STATES';

//2. action
export function createPcb(payload) {
    return {
        type: CREATE_PCB_REQUEST,
        payload
    }
}

export const resetCreatePcbSates= () => ({
    type: RESET_CREATE_PCB_STATES
});

//3. saga
function* handleCreatePcbRequest(action){
    yield (apiCallHandler(action, CREATE_PCB_SUCCESS, CREATE_PCB_FAILURE, apis.PCB_APIS_BASE_URL,apiTypes.CREATE));
}
export function* watchCreatePcbRequest() {
    yield takeLatest(CREATE_PCB_REQUEST,handleCreatePcbRequest)
}

//4. Reducer
export const initialState = fromJS({});
export function CreatePcbReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_PCB_SUCCESS:
            return Object.assign({}, state, {createPcbResponse: action.response})

        case CREATE_PCB_FAILURE:
            return Object.assign({}, state, {createPcbError: {error: action.error, errorTime: new Date()}})

        case RESET_CREATE_PCB_STATES:
            return Object.assign({}, state, {
                createPcbError: null,
                createPcbResponse: null,
            })
        default:
            return state;
    }
}

//5. Selector
const createPcbSelector = state => state.createPcb || initialState;
export const createPcbSuccess = createSelector(createPcbSelector,state=>state.createPcbResponse)
export const createPcbFailure =  createSelector(createPcbSelector,state=>state.createPcbError)
export {createPcbSelector}
