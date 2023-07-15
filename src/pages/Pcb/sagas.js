// import { call, put, takeLatest, all } from 'redux-saga/effects';
// import { apiCallHandler, apis, apiTypes } from "../../common-files/apiCallHandler";
// import { fromJS } from "immutable";
// import * as actions from "./actions";

// function* handleCreatePcbRequest(action) {
//     console.log("---saga--- handleCreatePcbRequest---")
//     yield (apiCallHandler(action, actions.CREATE_PCB_SUCCESS, actions.CREATE_PCB_FAILURE, apis.PCB_APIS_BASE_URL, apiTypes.CREATE));
// }

// export function* watchCreatePcbRequest() {
//     yield takeLatest(actions.CREATE_PCB_REQUEST, handleCreatePcbRequest)
// }
