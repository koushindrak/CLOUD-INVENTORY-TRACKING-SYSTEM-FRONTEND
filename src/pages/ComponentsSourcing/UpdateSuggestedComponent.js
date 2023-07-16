import {takeLatest} from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {fromJS} from "immutable";
import {createSelector} from "reselect";

export const UPDATE_SUGGESTED_COMPONENT_REQUEST = 'UPDATE_SUGGESTED_COMPONENT_REQUEST';
export const UPDATE_SUGGESTED_COMPONENT_SUCCESS = 'UPDATE_SUGGESTED_COMPONENT_SUCCESS';
export const UPDATE_SUGGESTED_COMPONENT_FAILURE = 'UPDATE_SUGGESTED_COMPONENT_FAILURE';
export const RESET_UPDATE_SUGGESTED_COMPONENT_STATES = 'RESET_UPDATE_SUGGESTED_COMPONENT_STATES';

//2. action
export function updateSuggestedComponent(payload) {
    return {
        type: UPDATE_SUGGESTED_COMPONENT_REQUEST,
        payload
    }
}

export const resetUpdateSuggestedComponentSates = () => ({
    type: RESET_UPDATE_SUGGESTED_COMPONENT_STATES
});

//3. saga
function* handleUpdateSuggestedComponentRequest(action) {
    yield (apiCallHandler(action, UPDATE_SUGGESTED_COMPONENT_SUCCESS, UPDATE_SUGGESTED_COMPONENT_FAILURE, apis.SUGGESTED_COMPONENT_APIS_BASE_URL, apiTypes.UPDATE_BY_ID));
}

export function* watchUpdateSuggestedComponentRequest() {
    yield takeLatest(UPDATE_SUGGESTED_COMPONENT_REQUEST, handleUpdateSuggestedComponentRequest)
}

//4. Reducer
export const initialState = fromJS({});

export function UpdateSuggestedComponentReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_SUGGESTED_COMPONENT_SUCCESS:
            return Object.assign({}, state, {updateSuggestedComponentResponse: action.response})

        case UPDATE_SUGGESTED_COMPONENT_FAILURE:
            return Object.assign({}, state, {updateSuggestedComponentError: {error: action.error, errorTime: new Date()}})

        case RESET_UPDATE_SUGGESTED_COMPONENT_STATES:
            return Object.assign({}, state, {
                updateSuggestedComponentError: null,
                updateSuggestedComponentResponse: null,
            })

        default:
            return state;
    }
}

//5. Selector
const updateSuggestedComponentSelector = state => state.updateSuggestedComponent || initialState;
export const updateSuggestedComponentSuccess = createSelector(updateSuggestedComponentSelector, state => state.updateSuggestedComponentResponse)
export const updateSuggestedComponentFailure = createSelector(updateSuggestedComponentSelector, state => state.updateSuggestedComponentError)
export {updateSuggestedComponentSelector}
