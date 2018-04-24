/*
 *
 * Header actions
 *
 */

import {
  DEFAULT_ACTION,
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  CHECK_LOGIN,
  CHECK_LOGIN_SUCCESS,
  CHECK_LOGIN_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loginRequest(email, password) {
  return {
    type: LOGIN_REQUEST,
    email,
    password,
  }
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  }
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  }
}

export function registerRequest(email, password, code) {
  return {
    type: REGISTER_REQUEST,
    email,
    password,
    code,
  }
}

export function registerError(error) {
  return {
    type: REGISTER_ERROR,
    error,
  }
}

export function registerSuccess(user) {
  return {
    type: REGISTER_SUCCESS,
    user,
  }
}

export function logout() {
  return {
    type: LOGOUT,
  }
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  }
}

export function logoutError() {
  return {
    type: LOGOUT_ERROR,
  }
}

export function checkLogin() {
  return {
    type: CHECK_LOGIN,
  }
}

export function checkLoginSuccess(uuid) {
  return {
    type: CHECK_LOGIN_SUCCESS,
    uuid
  }
}

export function checkLoginError(error) {
  return {
    type: CHECK_LOGIN_ERROR,
    error,
  }
}
