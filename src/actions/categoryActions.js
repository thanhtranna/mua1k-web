// @flow weak
import moment from 'moment';
import { fetchListCategories } from '../services/api';
import {
  ERROR_LIST_CATEGORIES,
  RECEIVED_LIST_CATEGORIES,
  REQUEST_LIST_CATEGORIES
} from '../constants/categoryType';
import { errorBadRequest } from './errorActions';

function requestListCategories(time = moment().format()) {
  return {
    type: REQUEST_LIST_CATEGORIES,
    isFetching: true,
    time
  };
}
function receivedListCategories(data, time = moment().format()) {
  return {
    type: RECEIVED_LIST_CATEGORIES,
    isFetching: false,
    categories: data,
    time
  };
}
function errorListCategories(time = moment().format()) {
  return {
    type: ERROR_LIST_CATEGORIES,
    isFetching: false,
    time
  };
}

export function getCategoriesIfNeeded(): (...any) => Promise<any> {
  return (dispatch: any => any, getState: () => boolean): any => {
    if (shouldGetCategories(getState())) {
      return dispatch(getCategories());
    }
    return Promise.resolve('already fetching categories...');
  };
}

function shouldGetCategories(state: any): boolean {
  const isFetching = state.category.isFetching;
  if (isFetching) {
    return false;
  }
  return true;
}

function getCategories() {
  return dispatch => {
    dispatch(requestListCategories());
    fetchListCategories()
      .then(data => {
        if (data.status !== 200) return dispatch(errorBadRequest(data.status));
        dispatch(receivedListCategories(data));
      })
      .catch(error => {
        dispatch(errorListCategories(error));
        dispatch(errorBadRequest(400));
      });
  };
}
