// @flow weak
import moment from 'moment';
import { fetchPointHistory } from '../services/api';
import {
  REQUEST_POINT_HISTORY,
  RECEIVED_POINT_HISTORY,
  ERROR_POINT_HISTORY
} from '../constants/pointHistoryType';
import { errorBadRequest } from './errorActions';

function requestPointHistory(time = moment().format()) {
  return {
    type: REQUEST_POINT_HISTORY,
    isFetching: true,
    time
  };
}
function receivedPointHistory(data, time = moment().format()) {
  return {
    type: RECEIVED_POINT_HISTORY,
    isFetching: false,
    pointHistory: data,
    time
  };
}
function errorPointHistory(time = moment().format()) {
  return {
    type: ERROR_POINT_HISTORY,
    isFetching: false,
    time
  };
}

export function getPointHistoryIfNeeded(
  page: number,
  token: string
): (...any) => Promise<any> {
  return (dispatch: any => any, getState: () => boolean): any => {
    if (shouldGetPointHistory(getState())) {
      return dispatch(getPointHistory(page, token));
    }
    return Promise.resolve('already fetching point history...');
  };
}

function shouldGetPointHistory(state: any): boolean {
  const isFetching = state.pointHistory.isFetching;
  if (isFetching) {
    return false;
  }
  return true;
}

function getPointHistory(page: number, token: string) {
  return dispatch => {
    dispatch(requestPointHistory());
    fetchPointHistory(page, token)
      .then(res => {
        if (res.status !== 200) return dispatch(errorBadRequest(res.status));
        dispatch(receivedPointHistory(res.data));
      })
      .catch(error => {
        dispatch(errorPointHistory(error));
        dispatch(errorBadRequest(400));
      });
  };
}
