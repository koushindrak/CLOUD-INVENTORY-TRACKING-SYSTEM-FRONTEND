import {takeLatest} from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {createSelector} from "reselect";
import {fromJS} from "immutable";

export const DELETE_SUGGESTED_COMPONENT_BY_ID_REQUEST = 'DELETE_SUGGESTED_COMPONENT_BY_ID_REQUEST';
export const DELETE_SUGGESTED_COMPONENT_BY_ID_SUCCESS = 'DELETE_SUGGESTED_COMPONENT_BY_ID_SUCCESS';
export const DELETE_SUGGESTED_COMPONENT_BY_ID_FAILURE = 'DELETE_SUGGESTED_COMPONENT_BY_ID_FAILURE';
export const RESET_DELETE_SUGGESTED_COMPONENT_BY_ID_STATES = 'RESET_DELETE_SUGGESTED_COMPONENT_BY_ID_STATES';

//2. action
export function deleteSuggestedComponentById(id) {
    return {
        type: DELETE_SUGGESTED_COMPONENT_BY_ID_REQUEST,
        id
    }
}

export const deleteGetSuggestedComponentByIdSates = () => ({
    type: RESET_DELETE_SUGGESTED_COMPONENT_BY_ID_STATES
});

//3. saga
function* handleDeleteSuggestedComponentByIdRequest(action) {
    yield (apiCallHandler(action, DELETE_SUGGESTED_COMPONENT_BY_ID_SUCCESS, DELETE_SUGGESTED_COMPONENT_BY_ID_FAILURE, apis.SUGGESTED_COMPONENT_APIS_BASE_URL, apiTypes.DELETE_BY_ID));
}

export function* watchDeleteSuggestedComponentByIdRequest() {
    yield takeLatest(DELETE_SUGGESTED_COMPONENT_BY_ID_REQUEST, handleDeleteSuggestedComponentByIdRequest)
}

//4. Reducer
export const initialState = fromJS({});

export function DeleteSuggestedComponentByIdReducer(state = initialState, action) {
    switch (action.type) {
        case DELETE_SUGGESTED_COMPONENT_BY_ID_SUCCESS:
            return Object.assign({}, state, {deleteSuggestedComponentByIdResponse: action.response})

        case DELETE_SUGGESTED_COMPONENT_BY_ID_FAILURE:
            return Object.assign({}, state, {deleteSuggestedComponentByIdError: {error: action.error, errorTime: new Date()}})

        case RESET_DELETE_SUGGESTED_COMPONENT_BY_ID_STATES:
            return Object.assign({}, state, {
                deleteSuggestedComponentByIdError: null,
                deleteSuggestedComponentByIdResponse: null,
            })

        default:
            return state;
    }
}

//5. Selector
const deleteSuggestedComponentByIdSelector = state => state.deleteCompById || initialState;
export const deleteSuggestedComponentByIdSuccess = createSelector(deleteSuggestedComponentByIdSelector, state => state.deleteSuggestedComponentByIdResponse)
export const deleteSuggestedComponentByIdFailure = createSelector(deleteSuggestedComponentByIdSelector, state => state.deleteSuggestedComponentByIdError)
export {deleteSuggestedComponentByIdSelector}
