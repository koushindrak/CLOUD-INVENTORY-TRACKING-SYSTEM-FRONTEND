import React from "react";
import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import * as COMMON_UTILS from './commonUtils';
import { API_HOST } from "../utils/constants";

export const apiTypes={
  GET_ALL:"GET_ALL",
  GET_BY_ID:"GET_BY_ID",
  UPDATE_BY_ID:"UPDATE_BY_ID",
  DELETE_BY_ID:"DELETE_BY_ID",
  CREATE:"CREATE",
  OTHER:"OTHER"
}
export const apis= {
  /*BASE APIS*/
   USER_APIS_BASE_URL: "/api/v1/users/kk",
   ROLE_APIS_BASE_URL: "/api/v1/role",
   PRODUCT_APIS_BASE_URL: "/api/v1/products",

  /*OTHER APIS*/
   LOGIN: '/api/v1/auth/signin',
   SIGNUP: '/api/v1/auth/signup',
}

export function* apiCallHandler(action, responseConst, errorConst, apiUrlConstant,type,isBaseUrl=true, isLoading = true) {
  console.log("apicall-------------------")
  try {
    // console.log("inside apiCallHandler calling api----",apiUrlConstant)
    yield (apiTryBlockHandler(action, responseConst, apiUrlConstant,type,isBaseUrl, isLoading));
  } catch (error) {
    console.log("error---"+error)
    yield (COMMON_UTILS.ErrorCheck(action, error, errorConst));
  } finally {
    console.log("finally called---apiCallHandler")
    isLoading ? yield put({ type: 'hide_loader' }) : null
  }
}

function* apiTryBlockHandler(action,responseConst,apiUrlConstant,type,isBaseUrl,isLoading) {
  console.log('isBaseUrl: ', isBaseUrl);
  // let url = window.URL + apiUrlConstant+"/";  //COMMENTED
  let url = `${API_HOST}` + apiUrlConstant;

  let method=axios.get;
  let urlAndMethod=setUrlAndMethod(type, url, action, method);
  console.log('urlAndMethod: ', urlAndMethod);

  if (isBaseUrl){
    console.log('isBaseUrl: ', isBaseUrl);
    if(action.payload){
      console.log('action.payload: ', action.payload);
      const response = yield call(urlAndMethod.method, urlAndMethod.url, action.payload, COMMON_UTILS.GetHeaders());
      yield put({ type: responseConst, response: response.data })
    }else {
      const response = yield call(urlAndMethod.method, urlAndMethod.url, COMMON_UTILS.GetHeaders());
      yield put({ type: responseConst, response: response.data})
    }
  }else {
    let apiName = COMMON_UTILS.getKeyByValue(apis,apiUrlConstant);

    switch (apiName) {
      case "LOGIN": {
        const response = yield call(axios.post, window.URL+apis.LOGIN, action.payload);
        console.log("SIGNIN-RESPONSE-OBJECT-IN-TRY-BLOCK3---",response)
        yield put({type: responseConst, response: response.data.data})
        break;
      }
      case "SIGNUP": {
        const response = yield call(axios.post, window.URL+apis.SIGNUP, action.payload);
        console.log("SIGNUP-RESPONSE-OBJECT-IN-TRY-BLOCK4---",response)
        yield put({type: responseConst, response: response.data})
        break;
      }
      case "GET_PARKING_AREA_STATS":
      case "GET_SLOTS_BY_PARKING_AREA_ID": {
        url=url.replace("{id}",action.id)
        const response = yield call(axios.get, url, COMMON_UTILS.GetHeaders());
        yield put({ type: responseConst, response: response.data})
      }
      default:
        break;
    }
  }
}

function setUrlAndMethod(type, url, action, method) {
  console.log(`setUrlAndMethod--type ${type} \n url ${url}, \n action ${action}, \n method ${method}`)
  switch (type) {
    case apiTypes.GET_ALL:
      break;
    case  apiTypes.GET_BY_ID:
      url = url + "/"+action.id
      break;
    case  apiTypes.UPDATE_BY_ID:
      url = url +"/"+ action.payload.id;
      method = axios.put;
      break;
    case  apiTypes.DELETE_BY_ID:
      url = url +"/"+ action.id;
      method = axios.delete;
      break;
    case  apiTypes.CREATE:
      method = axios.post;
      break;
  }
  return {url, method};
}
