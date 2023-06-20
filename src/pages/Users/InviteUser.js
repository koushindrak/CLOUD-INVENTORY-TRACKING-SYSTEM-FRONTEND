import {takeLatest} from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {createSelector} from "reselect";
import {fromJS} from "immutable";

export const INVITE_USER_REQUEST = 'INVITE_USER_REQUEST';
export const INVITE_USER_SUCCESS = 'INVITE_USER_SUCCESS';
export const INVITE_USER_FAILURE = 'INVITE_USER_FAILURE';
export const RESET_INVITE_USER_STATES = 'RESET_INVITE_USER_STATES';

//2. action
export function inviteUser(payload) {
    return {
        type: INVITE_USER_REQUEST,
        payload
    }
}

export const resetInviteUserSates = () => ({
    type: RESET_INVITE_USER_STATES
});

//3. saga
function* handleInviteUserRequest(action) {
    yield (apiCallHandler(action, INVITE_USER_SUCCESS, INVITE_USER_FAILURE, apis.USER_APIS_BASE_URL+"/invite", apiTypes.CREATE));
}

export function* watchInviteUserRequest() {
    yield takeLatest(INVITE_USER_REQUEST, handleInviteUserRequest)
}

//4. Reducer
export const initialState = fromJS({});

export function InviteUserReducer(state = initialState, action) {
    switch (action.type) {
        case INVITE_USER_SUCCESS:
            return Object.assign({}, state, {inviteUserResponse: action.response})

        case INVITE_USER_FAILURE:
            return Object.assign({}, state, {inviteUserError: {error: action.error, errorTime: new Date()}})

        case RESET_INVITE_USER_STATES:
            return Object.assign({}, state, {
                inviteUserError: null,
                inviteUserResponse: null,
            })
        default:
            return state;
    }
}

//5. Selector
const inviteUserSelector = state => state.inviteUser || initialState;
export const inviteUserSuccess = createSelector(inviteUserSelector, state => state.inviteUserResponse)
export const inviteUserFailure = createSelector(inviteUserSelector, state => state.inviteUserError)
export {inviteUserSelector}
