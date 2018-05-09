// @flow weak
import moment from 'moment';
import { fetchChanceBuyHistory } from '../services/api';
import {
  REQUEST_CHANCE_BUY_HISTORY,
  RECEIVED_CHANCE_BUY_HISTORY,
  ERROR_CHANCE_BUY_HISTORY
} from '../constants/chanceBuyHistoryType';
import { errorBadRequest } from './errorActions';

function requestChanceBuyHistory(time = moment().format()) {
  return {
    type: REQUEST_CHANCE_BUY_HISTORY,
    isFetching: true,
    time
  };
}
function receivedChanceBuyHistory(data, time = moment().format()) {
  return {
    type: RECEIVED_CHANCE_BUY_HISTORY,
    isFetching: false,
    chanceBuyHistory: data,
    time
  };
}
function errorChanceBuyHistory(time = moment().format()) {
  return {
    type: ERROR_CHANCE_BUY_HISTORY,
    isFetching: false,
    time
  };
}

export function getChanceBuyHistoryIfNeeded(
  page: number,
  token: string
): (...any) => Promise<any> {
  return (dispatch: any => any, getState: () => boolean): any => {
    if (shouldGetChanceBuyHistory(getState())) {
      return dispatch(getChanceBuyHistory(page, token));
    }
    return Promise.resolve('already fetching point history...');
  };
}

function shouldGetChanceBuyHistory(state: any): boolean {
  const isFetching = state.chanceBuyHistory.isFetching;
  if (isFetching) {
    return false;
  }
  return true;
}

function getChanceBuyHistory(page: number, token: string) {
  return dispatch => {
    dispatch(requestChanceBuyHistory());
    fetchChanceBuyHistory(page, token)
      .then(res => {
        if (res.status !== 200) return dispatch(errorBadRequest(res.status));
        dispatch(receivedChanceBuyHistory(res.data));
      })
      .catch(error => {
        dispatch(errorChanceBuyHistory(error));
        dispatch(errorBadRequest(400));
      });
  };
}
