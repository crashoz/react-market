/*
 *
 * Exchange actions
 *
 */

import {
  DEFAULT_ACTION,
  REQUEST_ORDER_BOOK,
  ORDER_BOOK_SUCCESS,
  ORDER_BOOK_ERROR,
  REQUEST_BUY_ORDER,
  BUY_ORDER_SUCCESS,
  BUY_ORDER_ERROR,
  REQUEST_SELL_ORDER,
  SELL_ORDER_SUCCESS,
  SELL_ORDER_ERROR,
  REQUEST_CANDLES,
  CANDLES_SUCCESS,
  CANDLES_ERROR
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function requestOrderBook(item) {
  return {
    type: REQUEST_ORDER_BOOK,
    item,
  };
}

export function orderBookSuccess(orderbook) {
  return {
    type: ORDER_BOOK_SUCCESS,
    orderbook,
  };
}

export function orderBookError(error) {
  return {
    type: ORDER_BOOK_ERROR,
    error,
  };
}

export function requestBuyOrder(item, quantity, price) {
  return {
    type: REQUEST_BUY_ORDER,
    item,
    quantity,
    price,
  };
}

export function buyOrderSuccess() {
  return {
    type: BUY_ORDER_SUCCESS,
  };
}

export function buyOrderError(error) {
  return {
    type: BUY_ORDER_ERROR,
    error,
  };
}

export function requestSellOrder(item, quantity, price) {
  return {
    type: REQUEST_SELL_ORDER,
    item,
    quantity,
    price,
  };
}

export function sellOrderSuccess() {
  return {
    type: SELL_ORDER_SUCCESS,
  };
}

export function sellOrderError(error) {
  return {
    type: SELL_ORDER_ERROR,
    error,
  };
}

export function requestCandles(id) {
  return {
    type: REQUEST_CANDLES,
    id,
  };
}

export function candlesSuccess(candles) {
  return {
    type: CANDLES_SUCCESS,
    candles,
  };
}

export function candlesError(error) {
  return {
    type: CANDLES_ERROR,
    error,
  };
}
