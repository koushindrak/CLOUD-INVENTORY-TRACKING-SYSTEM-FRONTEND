import {takeLatest} from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {createSelector} from "reselect";
import {fromJS} from "immutable";

export const GET_USER_BY_ID_REQUEST = 'GET_USER_BY_ID_REQUEST';
export const GET_USER_BY_ID_SUCCESS = 'GET_USER_BY_ID_SUCCESS';
export const GET_USER_BY_ID_FAILURE = 'GET_USER_BY_ID_FAILURE';
export const RESET_GET_USER_BY_ID_STATES = 'RESET_GET_USER_BY_ID_STATES';

//2. action
export function getUserById(id) {
    return {
        type: GET_USER_BY_ID_REQUEST,
        id
    }
}

export const resetGetUserByIdSates = () => ({
    type: RESET_GET_USER_BY_ID_STATES
});


//3. saga
function* handleGetUserByIdRequest(action) {
    yield (apiCallHandler(action, GET_USER_BY_ID_SUCCESS, GET_USER_BY_ID_FAILURE, apis.USER_APIS_BASE_URL, apiTypes.GET_BY_ID));
}

export function* watchGetUserByIdRequest() {
    yield takeLatest(GET_USER_BY_ID_REQUEST, handleGetUserByIdRequest)
}

//4. Reducer
export const initialState = fromJS({});

export function GetUserByIdReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_BY_ID_SUCCESS:
            return Object.assign({}, state, {getUserByIdResponse: action.response})

        case GET_USER_BY_ID_FAILURE:
            return Object.assign({}, state, {getUserByIdError: {error: action.error, errorTime: new Date()}})

        case RESET_GET_USER_BY_ID_STATES:
            return Object.assign({}, state, {
                getUserByIdError: null,
                getUserByIdResponse: null,
            })
        default:
            return state;
    }
}

//5. Selector
const getUserByIdSelector = state => state.userById || initialState;
export const getUserByIdSuccess = createSelector(getUserByIdSelector, state => state.getUserByIdResponse)
export const getUserByIdFailure = createSelector(getUserByIdSelector, state => state.getUserByIdError)
export {getUserByIdSelector}
