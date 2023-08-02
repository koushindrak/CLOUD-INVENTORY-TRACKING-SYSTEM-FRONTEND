import {takeLatest} from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {createSelector} from "reselect";
import {fromJS} from "immutable";

export const GET_SUGGESTED_COMPONENT_REQUEST = 'GET_SUGGESTED_COMPONENT_REQUEST';
export const GET_SUGGESTED_COMPONENT_SUCCESS = 'GET_SUGGESTED_COMPONENT_SUCCESS';
export const GET_SUGGESTED_COMPONENT_FAILURE = 'GET_SUGGESTED_COMPONENT_FAILURE';

//2. action
export function getSuggestedComponent() {
    return {
        type: GET_SUGGESTED_COMPONENT_REQUEST
    }
}

//3. saga
function* handleGetSuggestedComponentRequest(action) {
    yield (apiCallHandler(action, GET_SUGGESTED_COMPONENT_SUCCESS, GET_SUGGESTED_COMPONENT_FAILURE, apis.SUGGESTED_COMPONENT_APIS_BASE_URL, apiTypes.GET_BY_ID));
}

export function* watchGetSuggestedComponentRequest() {
    yield takeLatest(GET_SUGGESTED_COMPONENT_REQUEST, handleGetSuggestedComponentRequest)
}

//4. Reducer
export const initialState = fromJS({});

export function GetSuggestedComponentReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SUGGESTED_COMPONENT_SUCCESS:
            return Object.assign({}, state, {getSuggestedComponentResponse: action.response})

        case GET_SUGGESTED_COMPONENT_FAILURE:
            return Object.assign({}, state, {getSuggestedComponentError: {error: action.error, errorTime: new Date()}})
        default:
            return state;
    }
}

//5. Selector
const getSuggestedComponentSelector = state => state.suggestedComponent || initialState;
export const getSuggestedComponentSuccess = createSelector(getSuggestedComponentSelector, state => state.getSuggestedComponentResponse)
export const getSuggestedComponentFailure = createSelector(getSuggestedComponentSelector, state => state.getSuggestedComponentError)
export {getSuggestedComponentSelector}
