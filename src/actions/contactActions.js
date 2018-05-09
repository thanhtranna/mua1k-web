// @flow weak
import moment from 'moment';
import { fetchListContactCategories, postSendContact } from '../services/api';
import {
  REQUEST_LIST_CONTACT_CATEGORIES,
  RECEIVED_LIST_CONTACT_CATEGORIES,
  ERROR_LIST_CONTACT_CATEGORIES,
  REQUEST_SEND_CONTACT,
  RECEIVED_SEND_CONTACT,
  ERROR_SEND_CONTACT,
  RESET_CONTACT_STATES
} from '../constants/contactType';

function requestListContactCategories(time = moment().format()) {
  return {
    type: REQUEST_LIST_CONTACT_CATEGORIES,
    isFetching: true,
    time
  };
}
function receivedListContactCategories(data, time = moment().format()) {
  return {
    type: RECEIVED_LIST_CONTACT_CATEGORIES,
    isFetching: false,
    contactCategories: data,
    time
  };
}
function errorListContactCategories(time = moment().format()) {
  return {
    type: ERROR_LIST_CONTACT_CATEGORIES,
    isFetching: false,
    time
  };
}

export function getContactCategoryIfNeed(): (...any) => Promise<any> {
  return (dispatch: any => any, getState: () => boolean): any => {
    if (shouldGetContactCategories(getState())) {
      return dispatch(getContactCategories());
    }
    return Promise.resolve('already fetching categories...');
  };
}

function shouldGetContactCategories(state: any): boolean {
  const isFetching = state.category.isFetching;
  if (isFetching) {
    return false;
  }
  return true;
}

function getContactCategories() {
  return dispatch => {
    dispatch(requestListContactCategories());
    fetchListContactCategories()
      .then(data => dispatch(receivedListContactCategories(data)))
      .catch(error => dispatch(errorListContactCategories(error)));
  };
}

function requestSendContact(time = moment().format()) {
  return {
    type: REQUEST_SEND_CONTACT,
    isSending: true,
    time
  };
}
function receivedSendContact(data, msg, time = moment().format()) {
  return {
    type: RECEIVED_SEND_CONTACT,
    isSending: false,
    data,
    msg,
    time
  };
}

function errorSendContact(msg, time = moment().format()) {
  return {
    type: ERROR_SEND_CONTACT,
    isSending: false,
    msg,
    time
  };
}

function sendContact(contactCategory, email, content) {
  return dispatch => {
    dispatch(requestSendContact());
    postSendContact(contactCategory, email, content)
      .then(res => {
        if (res.status !== 200) throw res;

        dispatch(receivedSendContact(res.data, res.message));
      })
      .catch(error => {
        dispatch(errorSendContact(error.message));
      });
  };
}

export function sendContactIfNeeded(
  contactCategory: string,
  email: string,
  content: string
): (...any) => Promise<any> {
  return (dispatch: any => any, getState: () => boolean): any => {
    if (shouldSendContact(getState())) {
      return dispatch(sendContact(contactCategory, email, content));
    }
    return Promise.resolve('already logged in...');
  };
}

function shouldSendContact(state: any): boolean {
  const isSending = state.contact.isSending;
  if (isSending) {
    return false;
  }
  return true;
}

export function resetContactStates(time = moment().format()) {
  return {
    type: RESET_CONTACT_STATES,
    time
  };
}
