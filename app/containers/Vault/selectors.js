import { createSelector } from 'reselect';

/**
 * Direct selector to the vault state domain
 */
const selectVaultDomain = (state) => state.get('vault');

/**
 * Other specific selectors
 */
 const makeSelectVaultData = () => createSelector(
   selectVaultDomain,
   (substate) => substate.get('vault')
 );

/**
 * Default selector used by Vault
 */

const makeSelectVault = () => createSelector(
  selectVaultDomain,
  (substate) => substate.toJS()
);

export default makeSelectVault;
export {
  selectVaultDomain,
  makeSelectVault,
  makeSelectVaultData,
};
