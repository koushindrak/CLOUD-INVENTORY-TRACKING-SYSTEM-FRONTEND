import {takeLatest} from 'redux-saga/effects';

//1. constant
import {apiCallHandler, apis, apiTypes} from "../../common-files/apiCallHandler";
import {createSelector} from "reselect";
import {fromJS} from "immutable";

export const CREATE_COMPONENT_REQUEST = 'CREATE_COMPONENT_REQUEST';
export const CREATE_COMPONENT_SUCCESS = 'CREATE_COMPONENT_SUCCESS';
export const CREATE_COMPONENT_FAILURE = 'CREATE_COMPONENT_FAILURE';
export const RESET_CREATE_COMPONENT_STATES = 'RESET_CREATE_COMPONENT_STATES';

//2. action
export function createComponent(payload) {
    return {
        type: CREATE_COMPONENT_REQUEST,
        payload
    }
}

export const resetCreateComponentSates= () => ({
    type: RESET_CREATE_COMPONENT_STATES
});

//3. saga
function* handleCreateComponentRequest(action){
    yield (apiCallHandler(action, CREATE_COMPONENT_SUCCESS, CREATE_COMPONENT_FAILURE, apis.COMPONENT_APIS_BASE_URL,apiTypes.CREATE));
}
export function* watchCreateComponentRequest() {
    yield takeLatest(CREATE_COMPONENT_REQUEST,handleCreateComponentRequest)
}

//4. Reducer
export const initialState = fromJS({});
export function CreateComponentReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_COMPONENT_SUCCESS:
            return Object.assign({}, state, {createComponentResponse: action.response})

        case CREATE_COMPONENT_FAILURE:
            return Object.assign({}, state, {createComponentError: {error: action.error, errorTime: new Date()}})

        case RESET_CREATE_COMPONENT_STATES:
            return Object.assign({}, state, {
                createComponentError: null,
                createComponentResponse: null,
            })
        default:
            return state;
    }
}

//5. Selector
const createComponentSelector = state => state.createComponent || initialState;
export const createComponentSuccess = createSelector(createComponentSelector,state=>state.createComponentResponse)
export const createComponentFailure =  createSelector(createComponentSelector,state=>state.createComponentError)
export {createComponentSelector}
