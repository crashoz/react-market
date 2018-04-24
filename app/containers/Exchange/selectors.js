import { createSelector } from 'reselect';

/**
 * Direct selector to the exchange state domain
 */
const selectExchangeDomain = (state) => state.get('exchange');

/**
 * Other specific selectors
 */

 const makeSelectOrderBook = () => createSelector(
   selectExchangeDomain,
   (substate) => substate.get('orderbook')
 );

 const makeSelectCandles = () => createSelector(
   selectExchangeDomain,
   (substate) => substate.get('candles')
 );

/**
 * Default selector used by Exchange
 */

const makeSelectExchange = () => createSelector(
  selectExchangeDomain,
  (substate) => substate.toJS()
);

export default makeSelectExchange;
export {
  selectExchangeDomain,
  makeSelectExchange,
  makeSelectOrderBook,
  makeSelectCandles,
};
