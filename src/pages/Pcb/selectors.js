import { createSelector } from 'reselect';
import { initialState } from './reducers';
import * as ACTIONS from './actions';

const selectManagePcbDomain = state => state.pcb || initialState;

export const createPcbSuccess = createSelector(
  selectManagePcbDomain,
  substate => substate.createPcbResponse
);

export const createPcbFailure = createSelector(
  selectManagePcbDomain,
  substate => substate.createPcbError
);

export const getPcbSuccess = createSelector(
  selectManagePcbDomain,
  substate => substate.getPcbResponse
);

export const getPcbFailure = createSelector(
  selectManagePcbDomain,
  substate => substate.getPcbError
);

export const getPcbByIdSuccess = createSelector(
  selectManagePcbDomain,
  substate => substate.getPcbByIdResponse
);

export const getPcbByIdFailure = createSelector(
  selectManagePcbDomain,
  substate => substate.getPcbByIdError
);

export const updatePcbSuccess = createSelector(
  selectManagePcbDomain,
  substate => substate.updatePcbResponse
);

export const updatePcbFailure = createSelector(
  selectManagePcbDomain,
  substate => substate.updatePcbError
);

export const deletePcbSuccess = createSelector(
  selectManagePcbDomain,
  substate => substate.deletePcbResponse
);

export const deletePcbFailure = createSelector(
  selectManagePcbDomain,
  substate => substate.deletePcbError
);
