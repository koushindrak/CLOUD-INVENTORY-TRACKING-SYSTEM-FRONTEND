import {takeLatest} from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {createSelector} from "reselect";
import {fromJS} from "immutable";

export const CREATE_SUGGESTED_COMPONENT_REQUEST = 'CREATE_SUGGESTED_COMPONENT_REQUEST';
export const CREATE_SUGGESTED_COMPONENT_SUCCESS = 'CREATE_SUGGESTED_COMPONENT_SUCCESS';
export const CREATE_SUGGESTED_COMPONENT_FAILURE = 'CREATE_SUGGESTED_COMPONENT_FAILURE';
export const RESET_CREATE_SUGGESTED_COMPONENT_STATES = 'RESET_CREATE_SUGGESTED_COMPONENT_STATES';

//2. action
export function createSuggestedComponent(payload) {
    return {
        type: CREATE_SUGGESTED_COMPONENT_REQUEST,
        payload
    }
}

export const resetCreateSuggestedComponentSates = () => ({
    type: RESET_CREATE_SUGGESTED_COMPONENT_STATES
});

//3. saga
function* handleCreateSuggestedComponentRequest(action) {
    yield (apiCallHandler(action, CREATE_SUGGESTED_COMPONENT_SUCCESS, CREATE_SUGGESTED_COMPONENT_FAILURE, apis.SUGGESTED_COMPONENT_APIS_BASE_URL, apiTypes.CREATE));
}

export function* watchCreateSuggestedComponentRequest() {
    yield takeLatest(CREATE_SUGGESTED_COMPONENT_REQUEST, handleCreateSuggestedComponentRequest)
}

//4. Reducer
export const initialState = fromJS({});

export function CreateSuggestedComponentReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_SUGGESTED_COMPONENT_SUCCESS:
            return Object.assign({}, state, {createSuggestedComponentResponse: action.response})

        case CREATE_SUGGESTED_COMPONENT_FAILURE:
            return Object.assign({}, state, {createSuggestedComponentError: {error: action.error, errorTime: new Date()}})

        case RESET_CREATE_SUGGESTED_COMPONENT_STATES:
            return Object.assign({}, state, {
                createSuggestedComponentError: null,
                createSuggestedComponentResponse: null,
            })
        default:
            return state;
    }
}

//5. Selector
const createSuggestedComponentSelector = state => state.createSuggestedComponent || initialState;
export const createSuggestedComponentSuccess = createSelector(createSuggestedComponentSelector, state => state.createSuggestedComponentResponse)
export const createSuggestedComponentFailure = createSelector(createSuggestedComponentSelector, state => state.createSuggestedComponentError)
export {createSuggestedComponentSelector}
