/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST, REGISTER_REQUEST, LOGOUT, CHECK_LOGIN } from 'containers/Header/constants';
import { loginSuccess, loginError, registerSuccess, registerError, logoutSuccess, logoutError, checkLoginSuccess, checkLoginError } from 'containers/Header/actions';

import { requestJSON } from 'utils/request';

export function* loginRequest(data) {
  // Select username from store
  // const username = yield select(makeSelectUsername());
  const requestURL = `http://localhost:2500/auth/login`;
  const post = { email: data.email, password: data.password}
  try {
    // Call our request helper (see 'utils/request')
    const user = yield call(requestJSON, {requestURL, post});
    yield put(loginSuccess(user));
  } catch (err) {
    yield put(loginError(err));
  }
}

export function* registerRequest(data) {
  // Select username from store
  // const username = yield select(makeSelectUsername());
  const requestURL = `http://localhost:2500/auth/register`;
  const post = { email: data.email, password: data.password, code: data.code}
  try {
    // Call our request helper (see 'utils/request')
    const user = yield call(requestJSON, {requestURL, post});
    yield put(registerSuccess(user));
  } catch (err) {
    console.log(err);
    yield put(registerError(err));
  }
}

export function* logout() {
  // Select username from store
  // const username = yield select(makeSelectUsername());
  const requestURL = `http://localhost:2500/auth/logout`;
  try {
    // Call our request helper (see 'utils/request')
    const user = yield call(requestJSON, {requestURL, post: {}});
    yield put(logoutSuccess(user));
  } catch (err) {
    yield put(logoutError(err));
  }
}

export function* checkLogin() {
  const requestURL = `http://localhost:2500/auth/check`;
  try {
    const user = yield call(requestJSON, {requestURL, post: {}});
    yield put(checkLoginSuccess(user));
  } catch (err) {
    yield put(checkLoginError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loginData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOGIN_REQUEST, loginRequest);
  yield takeLatest(REGISTER_REQUEST, registerRequest);
  yield takeLatest(LOGOUT, logout);
  yield takeLatest(CHECK_LOGIN, checkLogin);
}
