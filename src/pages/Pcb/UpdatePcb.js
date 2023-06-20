import {takeLatest} from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {fromJS} from "immutable";
import {createSelector} from "reselect";

export const UPDATE_PCB_REQUEST = 'UPDATE_PCB_REQUEST';
export const UPDATE_PCB_SUCCESS = 'UPDATE_PCB_SUCCESS';
export const UPDATE_PCB_FAILURE = 'UPDATE_PCB_FAILURE';
export const RESET_UPDATE_PCB_STATES = 'RESET_UPDATE_PCB_STATES';

//2. action
export function updatePcb(payload) {
    return {
        type: UPDATE_PCB_REQUEST,
        payload
    }
}

export const resetUpdatePcbSates = () => ({
    type: RESET_UPDATE_PCB_STATES
});

//3. saga
function* handleUpdatePcbRequest(action) {
    yield (apiCallHandler(action, UPDATE_PCB_SUCCESS, UPDATE_PCB_FAILURE, apis.PCB_APIS_BASE_URL, apiTypes.UPDATE_BY_ID));
}

export function* watchUpdatePcbRequest() {
    yield takeLatest(UPDATE_PCB_REQUEST, handleUpdatePcbRequest)
}

//4. Reducer
export const initialState = fromJS({});

export function UpdatePcbReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_PCB_SUCCESS:
            return Object.assign({}, state, {updatePcbResponse: action.response})

        case UPDATE_PCB_FAILURE:
            return Object.assign({}, state, {updatePcbError: {error: action.error, errorTime: new Date()}})

        case RESET_UPDATE_PCB_STATES:
            return Object.assign({}, state, {
                updatePcbError: null,
                updatePcbResponse: null,
            })

        default:
            return state;
    }
}

//5. Selector
const updatePcbSelector = state => state.updatePcb || initialState;
export const updatePcbSuccess = createSelector(updatePcbSelector, state => state.updatePcbResponse)
export const updatePcbFailure = createSelector(updatePcbSelector, state => state.updatePcbError)
export {updatePcbSelector}
