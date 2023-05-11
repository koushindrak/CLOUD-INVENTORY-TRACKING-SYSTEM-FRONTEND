/*
 *
 * Products reducer
 *
 */


import { fromJS } from 'immutable';

export const initialState = fromJS({});
import * as CONSTANTS from './constants'

function manageProductsReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.CREATE_PRODUCT_SUCCESS:
      return Object.assign({},state,{createProductResponse:action.response})

    case CONSTANTS.CREATE_PRODUCT_FAILURE:
      return Object.assign({},state, {createProductError:{error:action.error,errorTime:new Date()}})

    case CONSTANTS.GET_PRODUCTS_SUCCESS:
      console.log("GET_PRODUCTS_SUCCESS selector---",action)
      return Object.assign({},state,{getProductResponse:action.response})

    case CONSTANTS.GET_PRODUCTS_FAILURE:
      return Object.assign({},state, {getProductError:{error:action.error,errorTime:new Date()}})

    case CONSTANTS.GET_PRODUCT_BY_ID_SUCCESS:
      return Object.assign({},state,{getProductByIdResponse:action.response})

    case CONSTANTS.GET_PRODUCT_BY_ID_FAILURE:
      return Object.assign({},state, {getProductByIdError:{error:action.error,errorTime:new Date()}})

    case CONSTANTS.UPDATE_PRODUCT_SUCCESS:
      return Object.assign({},state,{updateProductResponse:action.response})

    case CONSTANTS.UPDATE_PRODUCT_FAILURE:
      return Object.assign({},state, {updateProductError:{error:action.error,errorTime:new Date()}})

    case CONSTANTS.DELETE_PRODUCT_SUCCESS:
      return Object.assign({},state,{deleteProductResponse:action.response})

    case CONSTANTS.DELETE_PRODUCT_FAILURE:
      return Object.assign({},state, {deleteProductError:{error:action.error,errorTime:new Date()}})

    default:
      return state;
  }
}

export default manageProductsReducer;
