/*
 *
 * Header reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  CHECK_LOGIN,
  CHECK_LOGIN_SUCCESS,
  CHECK_LOGIN_ERROR,
} from './constants';

const initialState = fromJS({
  user: {
    registerError: '',
    loginError: '',
    loggedIn: false,
    uuid: ''
  }
});

function humanError(error) {
  switch (error) {
    case 'unknown-user':
      return 'Utilisateur inconnu';
    case 'wrong-password':
      return 'Mot de passe invalide';
    case 'code-expired':
      return 'Le code a expiré';
    case 'email-used':
      return 'E-mail déjà utilisé';
    case 'unknown-code':
      return 'Code invalide';
    case 'passwords-differ':
      return 'Les mots de passe sont différents';
    default:
      return 'Erreur interne';
  }
}

function headerReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOGIN_REQUEST:
      return state
    case LOGIN_SUCCESS:
      return state.setIn(['user', 'loggedIn'], true)
        .setIn(['user', 'uuid'], action.user.success)
        .setIn(['user', 'loginError'], '');
    case LOGIN_ERROR:
      return state.setIn(['user', 'loggedIn'], false)
        .setIn(['user', 'uuid'], '')
        .setIn(['user', 'loginError'], humanError(action.error.err))
    case REGISTER_REQUEST:
      return state;
    case REGISTER_SUCCESS:
      return state.setIn(['user', 'loggedIn'], true)
        .setIn(['user', 'uuid'], action.user.success)
        .setIn(['user', 'registerError'], '');
    case REGISTER_ERROR:
      return state.setIn(['user', 'loggedIn'], false)
        .setIn(['user', 'uuid'], '')
        .setIn(['user', 'registerError'], humanError(action.error.err))
    case LOGOUT:
      return state;
    case LOGOUT_SUCCESS:
      return state.setIn(['user', 'loggedIn'], false)
        .setIn(['user', 'uuid'], '');
    case LOGOUT_ERROR:
      return state.setIn(['user', 'loggedIn'], false)
        .setIn(['user', 'uuid'], '');
    case CHECK_LOGIN:
      return state;
    case CHECK_LOGIN_SUCCESS:
      return state.setIn(['user', 'loggedIn'], true)
        .setIn(['user', 'uuid'], action.uuid);
    case CHECK_LOGIN_ERROR:
      return state.setIn(['user', 'loggedIn'], false)
        .setIn(['user', 'uuid'], '');
    default:
      return state;
  }
}

export default headerReducer;
