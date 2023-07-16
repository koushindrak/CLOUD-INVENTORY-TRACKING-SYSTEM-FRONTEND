import {takeLatest} from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {createSelector} from "reselect";
import {fromJS} from "immutable";

export const GET_SUGGESTED_COMPONENT_BY_ID_REQUEST = 'GET_SUGGESTED_COMPONENT_BY_ID_REQUEST';
export const GET_SUGGESTED_COMPONENT_BY_ID_SUCCESS = 'GET_SUGGESTED_COMPONENT_BY_ID_SUCCESS';
export const GET_SUGGESTED_COMPONENT_BY_ID_FAILURE = 'GET_SUGGESTED_COMPONENT_BY_ID_FAILURE';
export const RESET_GET_SUGGESTED_COMPONENT_BY_ID_STATES = 'RESET_GET_SUGGESTED_COMPONENT_BY_ID_STATES';

//2. action
export function getSuggestedComponentById(id) {
    return {
        type: GET_SUGGESTED_COMPONENT_BY_ID_REQUEST,
        id
    }
}

export const resetGetSuggestedComponentByIdSates = () => ({
    type: RESET_GET_SUGGESTED_COMPONENT_BY_ID_STATES
});


//3. saga
function* handleGetSuggestedComponentByIdRequest(action) {
    yield (apiCallHandler(action, GET_SUGGESTED_COMPONENT_BY_ID_SUCCESS, GET_SUGGESTED_COMPONENT_BY_ID_FAILURE, apis.SUGGESTED_COMPONENT_APIS_BASE_URL, apiTypes.GET_BY_ID));
}

export function* watchGetSuggestedComponentByIdRequest() {
    yield takeLatest(GET_SUGGESTED_COMPONENT_BY_ID_REQUEST, handleGetSuggestedComponentByIdRequest)
}

//4. Reducer
export const initialState = fromJS({});

export function GetSuggestedComponentByIdReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SUGGESTED_COMPONENT_BY_ID_SUCCESS:
            return Object.assign({}, state, {getSuggestedComponentByIdResponse: action.response})

        case GET_SUGGESTED_COMPONENT_BY_ID_FAILURE:
            return Object.assign({}, state, {getSuggestedComponentByIdError: {error: action.error, errorTime: new Date()}})

        case RESET_GET_SUGGESTED_COMPONENT_BY_ID_STATES:
            return Object.assign({}, state, {
                getSuggestedComponentByIdError: null,
                getSuggestedComponentByIdResponse: null,
            })
        default:
            return state;
    }
}

//5. Selector
const getSuggestedComponentByIdSelector = state => state.suggestedComponentById || initialState;
export const getSuggestedComponentByIdSuccess = createSelector(getSuggestedComponentByIdSelector, state => state.getSuggestedComponentByIdResponse)
export const getSuggestedComponentByIdFailure = createSelector(getSuggestedComponentByIdSelector, state => state.getSuggestedComponentByIdError)
export {getSuggestedComponentByIdSelector}
