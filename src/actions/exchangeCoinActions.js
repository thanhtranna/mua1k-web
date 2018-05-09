// @flow weak
import moment from 'moment';
import { postExchangeCoin } from '../services/api';
import {
  REQUEST_EXCHANGE_COIN,
  RECEIVED_EXCHANGE_COIN,
  ERROR_EXCHANGE_COIN,
  SET_POINT
} from '../constants/exchangeCoinType';
import { reloadUserData } from './userAuthAction';

function requestExchangeCoin(time = moment().format()) {
  return {
    type: REQUEST_EXCHANGE_COIN,
    isSending: true,
    time
  };
}
function receivedExchangeCoin(time = moment().format()) {
  return {
    type: RECEIVED_EXCHANGE_COIN,
    isSending: false,
    time
  };
}

function errorExchangeCoin(msg, time = moment().format()) {
  return {
    type: ERROR_EXCHANGE_COIN,
    isSending: false,
    msg,
    time
  };
}

function exchangeCoin(point, token) {
  return dispatch => {
    dispatch(requestExchangeCoin());
    postExchangeCoin(point, token)
      .then(res => {
        if (res.status !== 200) throw res;

        dispatch(receivedExchangeCoin());
        reloadUserData(dispatch, token);
      })
      .catch(error => dispatch(errorExchangeCoin(error.message)));
  };
}

export function exchangeCoinIfNeeded(
  point: number,
  token: string
): (...any) => Promise<any> {
  return (dispatch: any => any, getState: () => boolean): any => {
    if (shouldExchangeCoin(getState())) {
      return dispatch(exchangeCoin(point, token));
    }
    return Promise.resolve('already logged in...');
  };
}

function shouldExchangeCoin(state: any): boolean {
  const isSending = state.exchangeCoin.isSending;
  if (isSending) {
    return false;
  }
  return true;
}

export function setPoint(point, time = moment().format()) {
  return {
    type: SET_POINT,
    point,
    time
  };
}
