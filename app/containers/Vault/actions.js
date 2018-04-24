/*
 *
 * Vault actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_VAULT,
  VAULT_SUCCESS,
  VAULT_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadVault() {
  return {
    type: LOAD_VAULT,
  };
}

export function vaultSuccess(vault) {
  return {
    type: VAULT_SUCCESS,
    vault,
  };
}

export function vaultError(error) {
  return {
    type: VAULT_ERROR,
    error,
  };
}
