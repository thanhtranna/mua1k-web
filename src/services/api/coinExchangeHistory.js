// @flow weak
import request from '../promisedHttpRequest';

let BASE_URL_TOKUBUY = process.env.REACT_APP_ROOT_API_TOKUBUY;

if (process.env.REACT_APP_ENV === 'staging') {
  BASE_URL_TOKUBUY = process.env.REACT_APP_ROOT_API_STG_TOKUBUY;
}

export function fetchCoinExchangeHistory(page, token) {
  const url = `${BASE_URL_TOKUBUY}user/me/coin-exchange-history-web?page=${page}`;
  return request.get(url, token);
}
