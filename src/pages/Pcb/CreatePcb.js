import { call, put, takeLatest, all } from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {createSelector} from "reselect";
import {fromJS} from "immutable";
import * as CONSTANTS from "../Products/constants";

export const CREATE_PCB_REQUEST = 'CREATE_PCB_REQUEST';
export const CREATE_PCB_SUCCESS = 'CREATE_PCB_SUCCESS';
export const CREATE_PCB_FAILURE = 'CREATE_PCB_FAILURE';
export const RESET_PCB_STATE = 'RESET_PCB_STATE';

//2. action
export function createPcb(payload) {
    console.log("Action---createPcb")
    return {
        type: CREATE_PCB_REQUEST,
        payload
    }
}

export const resetPcbSates= () => ({
    type: RESET_PCB_STATE
});
//3. saga
function* handleCreatePcbRequest(action){
    console.log("---saga--- handleCreatePcbRequest---")
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
            console.log("CREATE_PCB_SUCCESS---",action.response)
            return Object.assign({}, state, {createPcbResponse: action.response})

        case CREATE_PCB_FAILURE:
            return Object.assign({}, state, {createPcbError: {error: action.error, errorTime: new Date()}})

        case RESET_PCB_STATE:
            return Object.assign({}, state, {
                getPcbError: null,
                getPcbResponse:null,
                createPcbError:null,
                createPcbResponse:null})
        default:
            return state;
    }
}

//5. Selector
const createPcbSelector = state => state.createPcb || initialState;
export const createPcbSuccess = createSelector(createPcbSelector,state=>state.createPcbResponse)
export const createPcbFailure =  createSelector(createPcbSelector,state=>state.createPcbError)
export {createPcbSelector}
