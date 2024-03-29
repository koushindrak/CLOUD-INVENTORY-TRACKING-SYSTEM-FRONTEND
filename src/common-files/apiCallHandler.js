import React from "react";
import {call, put} from 'redux-saga/effects';
import axios from 'axios';
import * as COMMON_UTILS from './commonUtils';
import {API_HOST} from "../utils/constants";

export const apiTypes = {
    GET_ALL: "GET_ALL",
    GET_BY_ID: "GET_BY_ID",
    GET_BY_PARAM: "GET_BY_PARAM",
    UPDATE_BY_ID: "UPDATE_BY_ID",
    DELETE_BY_ID: "DELETE_BY_ID",
    CREATE: "CREATE",
    OTHER: "OTHER"
}
export const apis = {
    /*BASE APIS*/
    USER_APIS_BASE_URL: "/api/v1/users",
    ROLE_APIS_BASE_URL: "/api/v1/role",
    PRODUCT_APIS_BASE_URL: "/api/v1/products",
    PCB_APIS_BASE_URL: "/api/v1/pcb",
    COMPONENT_APIS_BASE_URL: "/api/v1/component",
    SUPPLIER_APIS_BASE_URL: "/api/v1/supplier",
    ORDER_APIS_BASE_URL: "/api/v1/dk/get-order-history",
    SUGGESTED_COMPONENT_APIS_BASE_URL: "/api/v1/dk/product/suggested",



    /*OTHER APIS*/
    LOGIN: '/api/v1/auth/signin',
    SIGNUP: '/api/v1/auth/signup',
}

export function* apiCallHandler(action, responseConst, errorConst, apiUrlConstant, type, isBaseUrl = true, isLoading = true) {
    try {
        yield (apiTryBlockHandler(action, responseConst, apiUrlConstant, type, isBaseUrl, isLoading));
    } catch (error) {
        yield (COMMON_UTILS.ErrorCheck(action, error, errorConst));
    } finally {
        isLoading ? yield put({type: 'hide_loader'}) : null
    }
}

function* apiTryBlockHandler(action, responseConst, apiUrlConstant, type, isBaseUrl, isLoading) {
    // let url = window.URL + apiUrlConstant+"/";  //COMMENTED
    let url = `${API_HOST}` + apiUrlConstant;
    console.log("url---", url)
    let method = axios.get;
    let urlAndMethod = setUrlAndMethod(type, url, action, method);

    if (isBaseUrl) {
        if (action.payload) {
            const response = yield call(urlAndMethod.method, urlAndMethod.url, action.payload, COMMON_UTILS.GetHeaders());
            yield put({type: responseConst, response: response.data})
        } else {
            const response = yield call(urlAndMethod.method, urlAndMethod.url, COMMON_UTILS.GetHeaders());
            yield put({type: responseConst, response: response.data})
        }
    } else {
        let apiName = COMMON_UTILS.getKeyByValue(apis, apiUrlConstant);

        switch (apiName) {
            case "LOGIN": {
                const response = yield call(axios.post, `${API_HOST}` + apis.LOGIN, action.payload);
                yield put({type: responseConst, response: response.data.data})
                break;
            }
            case "SIGNUP": {
                const response = yield call(axios.post, `${API_HOST}` + apis.SIGNUP, action.payload);
                yield put({type: responseConst, response: response.data})
                break;
            }
            default:
                break;
        }
    }
}

function setUrlAndMethod(type, url, action, method) {
    switch (type) {
        case apiTypes.GET_ALL:
            break;
        case  apiTypes.GET_BY_ID:
            url = url + "/" + action.id
            break;
        case  apiTypes.UPDATE_BY_ID:
            url = url + "/" + action.payload.id;
            method = axios.put;
            break;
        case  apiTypes.DELETE_BY_ID:
            url = url + "/" + action.id;
            method = axios.delete;
            break;
        case  apiTypes.CREATE:
            method = axios.post;
            break;
    }
    return {url, method};
}
