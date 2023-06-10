import {createSelector} from 'reselect';
import {initialState} from './reducers';

const selectManageProductsDomain = state => state.product || initialState;

export const createProductSuccess = createSelector(selectManageProductsDomain, substate => substate.createProductResponse)
export const createProductFailure = createSelector(selectManageProductsDomain, substate => substate.createProductError)

export const getProductSuccess = createSelector(selectManageProductsDomain, substate => substate.getProductResponse)
export const getProductFailure = createSelector(selectManageProductsDomain, substate => substate.getProductError)

export const getProductByIdSuccess = createSelector(selectManageProductsDomain, substate => substate.getProductByIdResponse)
export const getProductByIdFailure = createSelector(selectManageProductsDomain, substate => substate.getProductByIdError)

export const updateProductSuccess = createSelector(selectManageProductsDomain, substate => substate.updateProductResponse)
export const updateProductFailure = createSelector(selectManageProductsDomain, substate => substate.updateProductError)

export const deleteProductSuccess = createSelector(selectManageProductsDomain, substate => substate.deleteProductResponse)
export const deleteProductFailure = createSelector(selectManageProductsDomain, substate => substate.deleteProductError)

export {selectManageProductsDomain};
