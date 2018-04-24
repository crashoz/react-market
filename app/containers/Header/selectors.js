import { createSelector } from 'reselect';

/**
 * Direct selector to the header state domain
 */
const selectHeaderDomain = (state) => state.get('header');

/**
 * Other specific selectors
 */

const selectUserDomain = (state) => state.getIn(['header','user']);

const makeSelectRegisterError = () => createSelector(
  selectUserDomain,
  (substate) => substate.get('registerError')
);

const makeSelectLoginError = () => createSelector(
  selectUserDomain,
  (substate) => substate.get('loginError')
);

const makeSelectLoggedIn = () => createSelector(
  selectUserDomain,
  (substate) => substate.get('loggedIn')
);

const makeSelectUUID = () => createSelector(
  selectUserDomain,
  (substate) => substate.get('uuid')
);

/**
 * Default selector used by Header
 */

const makeSelectHeader = () => createSelector(
  selectHeaderDomain,
  (substate) => substate.toJS()
);

export default makeSelectHeader;
export {
  makeSelectHeader,
  selectHeaderDomain,
  makeSelectRegisterError,
  makeSelectLoginError,
  makeSelectLoggedIn,
  makeSelectUUID,
};
