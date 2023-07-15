import {takeLatest} from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {createSelector} from "reselect";
import {fromJS} from "immutable";

export const GET_USER_BY_CODE_REQUEST = 'GET_USER_BY_CODE_REQUEST';
export const GET_USER_BY_CODE_SUCCESS = 'GET_USER_BY_CODE_SUCCESS';
export const GET_USER_BY_CODE_FAILURE = 'GET_USER_BY_CODE_FAILURE';
export const RESET_GET_USER_BY_CODE_STATES = 'RESET_GET_USER_BY_CODE_STATES';

//2. action
export function getUserByCode(code) {
    return {
        type: GET_USER_BY_CODE_REQUEST,
        code
    }
}

export const resetGetUserByCodeSates = () => ({
    type: RESET_GET_USER_BY_CODE_STATES
});


//3. saga
function* handleGetUserByCodeRequest(action) {
    yield (apiCallHandler(action, GET_USER_BY_CODE_SUCCESS, GET_USER_BY_CODE_FAILURE, apis.USER_APIS_BASE_URL+"/code/"+action.code, apiTypes.GET_ALL));
}

export function* watchGetUserByCODERequest() {
    yield takeLatest(GET_USER_BY_CODE_REQUEST, handleGetUserByCodeRequest)
}

//4. Reducer
export const initialState = fromJS({});

export function GetUserByCodeReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_BY_CODE_SUCCESS:
            return Object.assign({}, state, {getUserByCodeResponse: action.response})

        case GET_USER_BY_CODE_FAILURE:
            return Object.assign({}, state, {getUserByCodeError: {error: action.error, errorTime: new Date()}})

        case RESET_GET_USER_BY_CODE_STATES:
            return Object.assign({}, state, {
                getUserByCodeError: null,
                getUserByCodeResponse: null,
            })
        default:
            return state;
    }
}

//5. Selector
const getUserByCodeSelector = state => state.userByCode || initialState;
export const getUserByCodeSuccess = createSelector(getUserByCodeSelector, state => state.getUserByCodeResponse)
export const getUserByCodeFailure = createSelector(getUserByCodeSelector, state => state.getUserByCodeError)
export {getUserByCodeSelector}
