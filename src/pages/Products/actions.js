/*
 *
 * Products actions
 *
 */

import * as CONSTANTS from './constants';

export function createProduct(payload) {
  return {
    type: CONSTANTS.CREATE_PRODUCT,
    payload
  }
}

export function getProducts() {
  console.log("Action- getProducts() ")
  return{
    type: CONSTANTS.GET_PRODUCTS
  }
}
export function getProductById(id) {
  console.log("Action---getProductById",id)
  return {
    type: CONSTANTS.GET_PRODUCT_BY_ID,
    id
  }
}
export function updateProduct(payload) {
  return {
    type: CONSTANTS.UPDATE_PRODUCT,
    payload
  }
}
export function deleteProduct(id) {
  console.log("Action--deleteProduct")
  return {
    type: CONSTANTS.DELETE_PRODUCT,
    id
  }
}
