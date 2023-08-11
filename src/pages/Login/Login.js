import {takeLatest} from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {createSelector} from "reselect";
import {fromJS} from "immutable";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const RESET_LOGIN_STATES = 'RESET_LOGIN_STATES';

//2. action
export function login(payload) {
    return {
        type: LOGIN_REQUEST,
        payload
    }
}

export const resetLoginSates = () => ({
    type: RESET_LOGIN_STATES
});

//3. saga
function* handleLoginRequest(action) {
    yield (apiCallHandler(action, LOGIN_SUCCESS, LOGIN_FAILURE, apis.LOGIN, apiTypes.OTHER, false));
}

export function* watchLoginRequest() {
    yield takeLatest(LOGIN_REQUEST, handleLoginRequest)
}

//4. Reducer
export const initialState = fromJS({});

export function LoginReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            console.log("LOGIN SUCCESS----",action.response)
            return Object.assign({}, state, {loginResponse: action.response})

        case LOGIN_FAILURE:
            console.log("LOGIN ERROR----",action.error)
            return Object.assign({}, state, {loginError: {error: action.error, errorTime: new Date()}})

        case RESET_LOGIN_STATES:
            return Object.assign({}, state, {
                loginError: null,
                loginResponse: null,
            })
        default:
            return state;
    }
}

//5. Selector
const loginSelector = state => state.login || initialState;
export const loginSuccess = createSelector(loginSelector, state => state.loginResponse)
export const loginFailure = createSelector(loginSelector, state => state.loginError)
export {loginSelector}
