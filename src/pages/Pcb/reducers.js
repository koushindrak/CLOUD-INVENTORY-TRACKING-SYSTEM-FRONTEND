import { fromJS } from 'immutable';
import * as ACTIONS from './actions';

export const initialState = fromJS({});

function managePcbReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.CREATE_PCB_SUCCESS:
      return state.set('createPcbResponse', action.response);

    case ACTIONS.CREATE_PCB_FAILURE:
      return state.set('createPcbError', {
        error: action.error,
        errorTime: new Date()
      });

    case ACTIONS.GET_PCB_SUCCESS:
      return state.set('getPcbResponse', action.response);

    case ACTIONS.GET_PCB_FAILURE:
      return state.set('getPcbError', {
        error: action.error,
        errorTime: new Date()
      });

    case ACTIONS.GET_PCB_BY_ID_SUCCESS:
      return state.set('getPcbByIdResponse', action.response);

    case ACTIONS.GET_PCB_BY_ID_FAILURE:
      return state.set('getPcbByIdError', {
        error: action.error,
        errorTime: new Date()
      });

    case ACTIONS.UPDATE_PCB_SUCCESS:
      return state.set('updatePcbResponse', action.response);

    case ACTIONS.UPDATE_PCB_FAILURE:
      return state.set('updatePcbError', {
        error: action.error,
        errorTime: new Date()
      });

    case ACTIONS.DELETE_PCB_SUCCESS:
      return state.set('deletePcbResponse', action.response);

    case ACTIONS.DELETE_PCB_FAILURE:
      return state.set('deletePcbError', {
        error: action.error,
        errorTime: new Date()
      });

    case ACTIONS.RESET_PCB_STATE:
      return state.merge({
        updatePcbResponse: null,
        getPcbByIdResponse: null,
        getPcbResponse: null,
        createPcbResponse: null
      });

    default:
      return state;
  }
}

export default managePcbReducer;
