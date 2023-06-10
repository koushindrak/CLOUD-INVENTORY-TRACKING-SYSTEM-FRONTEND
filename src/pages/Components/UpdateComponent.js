import {takeLatest} from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {fromJS} from "immutable";
import {createSelector} from "reselect";

export const UPDATE_COMPONENT_REQUEST = 'UPDATE_COMPONENT_REQUEST';
export const UPDATE_COMPONENT_SUCCESS = 'UPDATE_COMPONENT_SUCCESS';
export const UPDATE_COMPONENT_FAILURE = 'UPDATE_COMPONENT_FAILURE';
export const RESET_UPDATE_COMPONENT_STATES = 'RESET_UPDATE_COMPONENT_STATES';

//2. action
export function updateComponent(payload) {
    return {
        type: UPDATE_COMPONENT_REQUEST,
        payload
    }
}
export const resetUpdateComponentSates= () => ({
    type: RESET_UPDATE_COMPONENT_STATES
});

//3. saga
function* handleUpdateComponentRequest(action){
    yield (apiCallHandler(action, UPDATE_COMPONENT_SUCCESS, UPDATE_COMPONENT_FAILURE, apis.COMPONENT_APIS_BASE_URL,apiTypes.UPDATE_BY_ID));
}
export function* watchUpdateComponentRequest() {
    yield takeLatest(UPDATE_COMPONENT_REQUEST,handleUpdateComponentRequest)
}

//4. Reducer
export const initialState = fromJS({});
export function UpdateComponentReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_COMPONENT_SUCCESS:
            return Object.assign({}, state, {updateComponentResponse: action.response})

        case UPDATE_COMPONENT_FAILURE:
            return Object.assign({}, state, {updateComponentError: {error: action.error, errorTime: new Date()}})

        case RESET_UPDATE_COMPONENT_STATES:
            return Object.assign({}, state, {
                updateComponentError: null,
                updateComponentResponse: null,
            })

        default:
            return state;
    }
}

//5. Selector
const updateComponentSelector = state => state.updateComponent || initialState;
export const updateComponentSuccess = createSelector(updateComponentSelector,state=>state.updateComponentResponse)
export const updateComponentFailure =  createSelector(updateComponentSelector,state=>state.updateComponentError)
export {updateComponentSelector}
