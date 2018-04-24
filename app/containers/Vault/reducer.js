/*
 *
 * Vault reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOAD_VAULT,
  VAULT_SUCCESS,
  VAULT_ERROR,
} from './constants';

const initialState = fromJS({
  vault: [],
  loading: false,
  error: ''
});

function vaultReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_VAULT:
      return state.set('loading', true);
    case VAULT_SUCCESS:
      return state.set('vault', action.vault)
        .set('loading', false);
    case VAULT_ERROR:
      return state.set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default vaultReducer;
