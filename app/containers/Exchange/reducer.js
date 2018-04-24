/*
 *
 * Exchange reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  REQUEST_ORDER_BOOK,
  ORDER_BOOK_SUCCESS,
  ORDER_BOOK_ERROR,
  REQUEST_CANDLES,
  CANDLES_SUCCESS,
  CANDLES_ERROR,
} from './constants';

const initialState = fromJS({
  loadingOrderBook: false,
  loadingCandles: false,
  orderbookError: '',
  candlesError: '',
  orderbook: [[],[]],
  candles: []
});

function exchangeReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case REQUEST_ORDER_BOOK:
      return state.set('loadingOrderBook', true);
    case ORDER_BOOK_SUCCESS:
      return state.set('loadingOrderBook', false)
        .set('orderbookError', '')
        .set('orderbook', fromJS(action.orderbook));
    case ORDER_BOOK_ERROR:
      return state.set('loadingOrderBook', false)
        .set('orderbookError', action.error)
        .set('orderbook', {});
    case REQUEST_CANDLES:
      return state.set('loadingCandles', true);
    case ORDER_BOOK_SUCCESS:
      return state.set('loadingCandles', false)
        .set('candlesError', '')
        .set('candles', action.candles);
    case ORDER_BOOK_ERROR:
      return state.set('loadingCandles', false)
        .set('candlesError', action.error)
        .set('candles', []);
    default:
      return state;
  }
}

export default exchangeReducer;
