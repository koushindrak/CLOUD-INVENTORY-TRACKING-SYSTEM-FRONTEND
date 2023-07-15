import {takeLatest} from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {createSelector} from "reselect";
import {fromJS} from "immutable";

export const DELETE_USER_BY_ID_REQUEST = 'DELETE_USER_BY_ID_REQUEST';
export const DELETE_USER_BY_ID_SUCCESS = 'DELETE_USER_BY_ID_SUCCESS';
export const DELETE_USER_BY_ID_FAILURE = 'DELETE_USER_BY_ID_FAILURE';
export const RESET_DELETE_USER_BY_ID_STATES = 'RESET_DELETE_USER_BY_ID_STATES';

//2. action
export function deleteUserById(id) {
    return {
        type: DELETE_USER_BY_ID_REQUEST,
        id
    }
}

export const deleteGetUserByIdSates = () => ({
    type: RESET_DELETE_USER_BY_ID_STATES
});

//3. saga
function* handleDeleteUserByIdRequest(action) {
    yield (apiCallHandler(action, DELETE_USER_BY_ID_SUCCESS, DELETE_USER_BY_ID_FAILURE, apis.USER_APIS_BASE_URL, apiTypes.DELETE_BY_ID));
}

export function* watchDeleteUserByIdRequest() {
    yield takeLatest(DELETE_USER_BY_ID_REQUEST, handleDeleteUserByIdRequest)
}

//4. Reducer
export const initialState = fromJS({});

export function DeleteUserByIdReducer(state = initialState, action) {
    switch (action.type) {
        case DELETE_USER_BY_ID_SUCCESS:
            return Object.assign({}, state, {deleteUserByIdResponse: action.response})

        case DELETE_USER_BY_ID_FAILURE:
            return Object.assign({}, state, {deleteUserByIdError: {error: action.error, errorTime: new Date()}})

        case RESET_DELETE_USER_BY_ID_STATES:
            return Object.assign({}, state, {
                deleteUserByIdError: null,
                deleteUserByIdResponse: null,
            })

        default:
            return state;
    }
}

//5. Selector
const deleteUserByIdSelector = state => state.deleteCompById || initialState;
export const deleteUserByIdSuccess = createSelector(deleteUserByIdSelector, state => state.deleteUserByIdResponse)
export const deleteUserByIdFailure = createSelector(deleteUserByIdSelector, state => state.deleteUserByIdError)
export {deleteUserByIdSelector}
