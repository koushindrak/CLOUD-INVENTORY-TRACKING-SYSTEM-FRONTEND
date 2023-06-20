import {takeLatest} from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {createSelector} from "reselect";
import {fromJS} from "immutable";

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

//2. action
export function getUser() {
    return {
        type: GET_USER_REQUEST
    }
}

//3. saga
function* handleGetUserRequest(action) {
    yield (apiCallHandler(action, GET_USER_SUCCESS, GET_USER_FAILURE, apis.USER_APIS_BASE_URL, apiTypes.GET_ALL));
}

export function* watchGetUserRequest() {
    yield takeLatest(GET_USER_REQUEST, handleGetUserRequest)
}

//4. Reducer
export const initialState = fromJS({});

export function GetUserReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_SUCCESS:
            return Object.assign({}, state, {getUserResponse: action.response})

        case GET_USER_FAILURE:
            return Object.assign({}, state, {getUserError: {error: action.error, errorTime: new Date()}})
        default:
            return state;
    }
}

//5. Selector
const getUserSelector = state => state.user || initialState;
export const getUserSuccess = createSelector(getUserSelector, state => state.getUserResponse)
export const getUserFailure = createSelector(getUserSelector, state => state.getUserError)
export {getUserSelector}
