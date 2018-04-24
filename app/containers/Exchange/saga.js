import { call, put, select, takeLatest } from 'redux-saga/effects';
import { REQUEST_ORDER_BOOK, REQUEST_BUY_ORDER, REQUEST_SELL_ORDER, REQUEST_CANDLES } from 'containers/Exchange/constants';
import { orderBookSuccess, orderBookError, buyOrderSuccess, buyOrderError, sellOrderSuccess, sellOrderError, requestOrderBook } from 'containers/Exchange/actions';

import { requestJSON } from 'utils/request';
// import { take, call, put, select } from 'redux-saga/effects';
//
export function* getOrderBook(data) {
  const requestURL = `http://localhost:2500/orderbook/get`;
  const post = {item: data.item};
  try {
    const orderbook = yield call(requestJSON, {requestURL, post: post});
    yield put(orderBookSuccess(orderbook));
  } catch (err) {
    yield put(orderBookError(err));
  }
}

export function* postBuyOrder(data) {
  const requestURL = `http://localhost:2500/orderbook/buy`;
  const post = {item: data.item, price: data.price, quantity: data.quantity};
  try {
    const buy = yield call(requestJSON, {requestURL, post: post});
    yield put(buyOrderSuccess());
    yield put(requestOrderBook(data.item))
  } catch (err) {
    yield put(buyOrderError(err));
  }
}

export function* postSellOrder(data) {
  const requestURL = `http://localhost:2500/orderbook/sell`;
  const post = {item: data.item, price: data.price, quantity: data.quantity};
  try {
    const buy = yield call(requestJSON, {requestURL, post: post});
    yield put(sellOrderSuccess());
    yield put(requestOrderBook(data.item))
  } catch (err) {
    yield put(sellOrderError(err));
  }
}


// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(REQUEST_ORDER_BOOK, getOrderBook);
  yield takeLatest(REQUEST_BUY_ORDER, postBuyOrder);
  yield takeLatest(REQUEST_SELL_ORDER, postSellOrder);
}
