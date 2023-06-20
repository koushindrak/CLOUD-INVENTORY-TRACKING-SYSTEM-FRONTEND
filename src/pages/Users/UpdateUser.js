import {takeLatest} from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {fromJS} from "immutable";
import {createSelector} from "reselect";

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
export const RESET_UPDATE_USER_STATES = 'RESET_UPDATE_USER_STATES';

//2. action
export function updateUser(payload) {
    return {
        type: UPDATE_USER_REQUEST,
        payload
    }
}

export const resetUpdateUserSates = () => ({
    type: RESET_UPDATE_USER_STATES
});

//3. saga
function* handleUpdateUserRequest(action) {
    yield (apiCallHandler(action, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE, apis.USER_APIS_BASE_URL, apiTypes.UPDATE_BY_ID));
}

export function* watchUpdateUserRequest() {
    yield takeLatest(UPDATE_USER_REQUEST, handleUpdateUserRequest)
}

//4. Reducer
export const initialState = fromJS({});

export function UpdateUserReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER_SUCCESS:
            return Object.assign({}, state, {updateUserResponse: action.response})

        case UPDATE_USER_FAILURE:
            return Object.assign({}, state, {updateUserError: {error: action.error, errorTime: new Date()}})

        case RESET_UPDATE_USER_STATES:
            return Object.assign({}, state, {
                updateUserError: null,
                updateUserResponse: null,
            })

        default:
            return state;
    }
}

//5. Selector
const updateUserSelector = state => state.updateUser || initialState;
export const updateUserSuccess = createSelector(updateUserSelector, state => state.updateUserResponse)
export const updateUserFailure = createSelector(updateUserSelector, state => state.updateUserError)
export {updateUserSelector}
