// @flow weak
import moment from 'moment';
import { fetchListAddress } from '../services/api';
import {
  REQUEST_LIST_ADDRESS,
  RECEIVED_LIST_ADDRESS,
  ERROR_LIST_ADDRESS
} from '../constants/addressType';
import { errorBadRequest } from './errorActions';

function requestListAddress(time = moment().format()) {
  return {
    type: REQUEST_LIST_ADDRESS,
    isFetching: true,
    time
  };
}
function receivedListAddress(data, time = moment().format()) {
  return {
    type: RECEIVED_LIST_ADDRESS,
    isFetching: false,
    address: data,
    time
  };
}
function errorListAddress(time = moment().format()) {
  return {
    type: ERROR_LIST_ADDRESS,
    isFetching: false,
    time
  };
}

export function getAddressIfNeed(accessToken): (...any) => Promise<any> {
  return (dispatch: any => any, getState: () => boolean): any => {
    if (shouldGetAddress(getState())) {
      return dispatch(getAddress(accessToken));
    }
    return Promise.resolve('already fetching address...');
  };
}

function shouldGetAddress(state: any): boolean {
  const isFetching = state.category.isFetching;
  if (isFetching) {
    return false;
  }
  return true;
}

function getAddress(accessToken) {
  return dispatch => {
    dispatch(requestListAddress());
    fetchListAddress(accessToken)
      .then(data => {
        if (data.status !== 200) return dispatch(errorBadRequest(data.status));
        dispatch(receivedListAddress(data));
      })
      .catch(error => {
        dispatch(errorListAddress(error));
        dispatch(errorBadRequest(400));
      });
  };
}
