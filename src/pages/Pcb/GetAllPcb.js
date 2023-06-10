import {takeLatest} from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {createSelector} from "reselect";
import {fromJS} from "immutable";

export const GET_PCB_REQUEST = 'GET_PCB_REQUEST';
export const GET_PCB_SUCCESS = 'GET_PCB_SUCCESS';
export const GET_PCB_FAILURE = 'GET_PCB_FAILURE';

//2. action
export function getPcb() {
    console.log("getting pcbssss")
    return {
        type: GET_PCB_REQUEST
    }
}

//3. saga
function* handleGetPcbRequest(action) {
    yield (apiCallHandler(action, GET_PCB_SUCCESS, GET_PCB_FAILURE, apis.PCB_APIS_BASE_URL, apiTypes.GET_ALL));
}

export function* watchGetPcbRequest() {
    yield takeLatest(GET_PCB_REQUEST, handleGetPcbRequest)
}

//4. Reducer
export const initialState = fromJS({});

export function GetPcbReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PCB_SUCCESS:
            return Object.assign({}, state, {getPcbResponse: action.response})

        case GET_PCB_FAILURE:
            return Object.assign({}, state, {getPcbError: {error: action.error, errorTime: new Date()}})
        default:
            return state;
    }
}

//5. Selector
const getPcbSelector = state => state.pcb || initialState;
export const getPcbSuccess = createSelector(getPcbSelector, state => state.getPcbResponse)
export const getPcbFailure = createSelector(getPcbSelector, state => state.getPcbError)
export {getPcbSelector}
