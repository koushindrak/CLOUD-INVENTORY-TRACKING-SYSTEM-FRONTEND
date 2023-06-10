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
    return {
        type: CONSTANTS.GET_PRODUCTS
    }
}

export function getProductById(id) {
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
    return {
        type: CONSTANTS.DELETE_PRODUCT,
        id
    }
}

export const resetUpdateSuccess = () => ({
    type: CONSTANTS.RESET_PRODUCTS_STATE
});