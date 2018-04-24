/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOGIN_SUCCESS } from 'containers/Header/constants';
import { LOAD_VAULT } from 'containers/Vault/constants';
import { vaultSuccess, vaultError } from 'containers/Vault/actions';

import { requestJSON } from 'utils/request';
import request from 'utils/request';

export function* loadVault() {
  // Select username from store
  // const username = yield select(makeSelectUsername());
  const requestURL = `http://localhost:2500/vault/get`;
  try {
    // Call our request helper (see 'utils/request')
    const vault = yield call(request, requestURL);
    yield put(vaultSuccess(vault));
  } catch (err) {
    yield put(vaultError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* vaultData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_VAULT, loadVault);
  yield takeLatest(LOGIN_SUCCESS, loadVault)
}
