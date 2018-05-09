// @flow weak

import request from '../promisedHttpRequest';

let BASE_URL_TOKUBUY = process.env.REACT_APP_ROOT_API_TOKUBUY;

if (process.env.REACT_APP_ENV === 'staging') {
  BASE_URL_TOKUBUY = process.env.REACT_APP_ROOT_API_STG_TOKUBUY;
}

export function fetchListAuctions(pageNumber, typeFilter = 1) {
  const url = `${BASE_URL_TOKUBUY}auctions?page=${pageNumber}&type=${typeFilter}`;
  return request.get(url);
}

export function fetchListAuctionsByCategory(cateId, cateName, pageNumber = 1) {
  const url =
    cateName === '全て' ?
    `${BASE_URL_TOKUBUY}auction/categories/all?page=${pageNumber}` :
    `${BASE_URL_TOKUBUY}auction/category/${cateId}?page=${pageNumber}`;
  return request.get(url);
}

export function fetchAuctionsFinished(page: number) {
  const url = `${BASE_URL_TOKUBUY}auction/final?page=${page}`;
  return request.get(url);
}

export function fetchListAuctionsByKeyword(keyword, pageNumber) {
  const url =
    keyword === '' ?
    `${BASE_URL_TOKUBUY}auction/categories/all?page=${pageNumber}` :
    `${BASE_URL_TOKUBUY}search?keyword=${keyword}&page=${pageNumber}`;
  return request.get(url);
}