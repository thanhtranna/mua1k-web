// @flow weak
import moment from 'moment';
import { fetchCoinExchangeHistory } from '../services/api';
import {
  REQUEST_COIN_EXCHANGE_HISTORY,
  RECEIVED_COIN_EXCHANGE_HISTORY,
  ERROR_COIN_EXCHANGE_HISTORY
} from '../constants/coinExchangeType';
import { errorBadRequest } from './errorActions';

function requestCoinExchangeHistory(time = moment().format()) {
  return {
    type: REQUEST_COIN_EXCHANGE_HISTORY,
    isFetching: true,
    time
  };
}
function receivedCoinExchangeHistory(data, time = moment().format()) {
  return {
    type: RECEIVED_COIN_EXCHANGE_HISTORY,
    isFetching: false,
    coinExchangeHistory: data,
    time
  };
}
function errorCoinExchangeHistory(time = moment().format()) {
  return {
    type: ERROR_COIN_EXCHANGE_HISTORY,
    isFetching: false,
    time
  };
}

export function getCoinExchangeHistoryIfNeeded(
  page: number,
  token: string
): (...any) => Promise<any> {
  return (dispatch: any => any, getState: () => boolean): any => {
    if (shouldGetCoinExchangeHistory(getState())) {
      return dispatch(getCoinExchangeHistory(page, token));
    }
    return Promise.resolve('already fetching point history...');
  };
}

function shouldGetCoinExchangeHistory(state: any): boolean {
  const isFetching = state.coinExchangeHistory.isFetching;
  if (isFetching) {
    return false;
  }
  return true;
}

function getCoinExchangeHistory(page: number, token: string) {
  return dispatch => {
    dispatch(requestCoinExchangeHistory());
    fetchCoinExchangeHistory(page, token)
      .then(res => {
        if (res.status !== 200) return dispatch(errorBadRequest(res.status));
        dispatch(receivedCoinExchangeHistory(res.data));
      })
      .catch(error => {
        dispatch(errorCoinExchangeHistory(error));
        dispatch(errorBadRequest(400));
      });
  };
}
