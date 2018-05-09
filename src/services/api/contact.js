// @flow weak

import request from '../promisedHttpRequest';

let BASE_URL_TOKUBUY = process.env.REACT_APP_ROOT_API_TOKUBUY;

if (process.env.REACT_APP_ENV === 'staging') {
  BASE_URL_TOKUBUY = process.env.REACT_APP_ROOT_API_STG_TOKUBUY;
}

export function fetchListContactCategories() {
  const url = `${BASE_URL_TOKUBUY}contact/category`;
  return request.get(url);
}

export function postSendContact(contactCategory, email, content) {
  const url = `${BASE_URL_TOKUBUY}contact`;
  const data = {
    contactCategory,
    email,
    content
  };
  return request.post(url, data);
}
