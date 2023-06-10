import {takeLatest} from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {createSelector} from "reselect";
import {fromJS} from "immutable";

export const GET_CATEGORY_REQUEST = 'GET_CATEGORY_REQUEST';
export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS';
export const GET_CATEGORY_FAILURE = 'GET_CATEGORY_FAILURE';

//2. action
export function getCategories() {
    return {
        type: GET_CATEGORY_REQUEST
    }
}

//3. saga
function* handleGetCategoryRequest(action){
    yield (apiCallHandler(action, GET_CATEGORY_SUCCESS, GET_CATEGORY_FAILURE, apis.PRODUCT_APIS_BASE_URL+"/category",apiTypes.GET_ALL));
}
export function* watchGetCategoryRequest() {
    yield takeLatest(GET_CATEGORY_REQUEST,handleGetCategoryRequest)
}

//4. Reducer
export const initialState = fromJS({});
export function GetCategoryReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORY_SUCCESS:
            return Object.assign({}, state, {getCategoryResponse: action.response})

        case GET_CATEGORY_FAILURE:
            return Object.assign({}, state, {getCategoryError: {error: action.error, errorTime: new Date()}})
        default:
            return state;
    }
}

//5. Selector
const getCategorySelector = state => state.category || initialState;
export const getCategorySuccess = createSelector(getCategorySelector,state=>state.getCategoryResponse)
export const getCategoryFailure =  createSelector(getCategorySelector,state=>state.getCategoryError)
export {getCategorySelector}
