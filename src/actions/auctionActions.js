// @flow weak
import moment from 'moment';
import _ from 'lodash';
import {
  fetchListAuctions,
  fetchListAuctionsByCategory,
  fetchAuctionsFinished,
  fetchListAuctionsByKeyword
} from '../services/api';
import {
  ERROR_LIST_AUCTIONS,
  RECEIVED_LIST_AUCTIONS,
  REQUEST_LIST_AUCTIONS,
  LOAD_MORE,
  RESET_AUCTION_STATES,
  FILTER_LIST_AUCTIONS,
  REQUEST_LIST_AUCTIONS_FINISHED,
  RECEIVED_LIST_AUCTIONS_FINISHED,
  ERROR_LIST_AUCTIONS_FINISHED,
  LOAD_MORE_FINISH,
  UPDATE_KEYWORD,
  RESET_PAGE_NUMBER
} from '../constants/auctionType';
import { errorBadRequest } from './errorActions';

function requestListAuctions(
  isGetByCategory = false,
  cateId,
  cateName,
  isGetByKeyword = false,
  keyword,
  time = moment().format()
) {
  return {
    type: REQUEST_LIST_AUCTIONS,
    isFetching: true,
    isAuctionsGetByCategory: isGetByCategory,
    categoryId: cateId,
    categoryName: cateName,
    isAuctionsGetByKeyword: isGetByKeyword,
    keyword: keyword,
    time
  };
}

function receivedListAuctions(
  data,
  filter = {},
  state,
  time = moment().format()
) {
  if (state.auction.pageNumberAuction !== 1) {
    let oldData = state.auction.auctions;
    let newData = !_.has(data, 'data.auctions')
      ? data.data
      : data.data.auctions;
    data.data = _.uniqBy(oldData.concat(newData), '_id');
  }
  return {
    type: RECEIVED_LIST_AUCTIONS,
    isFetching: false,
    auctions: !_.has(data, 'data.auctions') ? data.data : data.data.auctions,
    filterTypeAuction: filter.type,
    filterName: filter.name,
    time
  };
}

function errorListAuctions(time = moment().format()) {
  return {
    type: ERROR_LIST_AUCTIONS,
    isFetching: false,
    time
  };
}

export function getAuctionsIfNeeded(
  pageNumber,
  filter = {}
): (...any) => Promise<any> {
  return (dispatch: any => any, getState: () => boolean): any => {
    if (shouldGetAuctions(getState())) {
      return dispatch(getAuctions(pageNumber, filter, getState()));
    }
    return Promise.resolve('already fetching auctions...');
  };
}

export function getAuctionsIfNeededByCategory(
  cateId,
  cateName,
  pageNumber,
  filter = {}
): (...any) => Promise<any> {
  return (dispatch: any => any, getState: () => boolean): any => {
    if (shouldGetAuctions(getState())) {
      return dispatch(
        getAuctionsByCategory(cateId, cateName, pageNumber, filter, getState())
      );
    }
    return Promise.resolve('already fetching auctions...');
  };
}

export function updateKeyword(keyword, time = moment().format()) {
  return {
    type: UPDATE_KEYWORD,
    keyword: keyword,
    act: '', //clear act state to prepare for next search
    time
  };
}

export function searchAuctionByKeyword(
  keyword,
  pageNumber,
  filter = {}
): (...any) => Promise<any> {
  return (dispatch: any => any, getState: () => boolean): any => {
    if (shouldGetAuctions(getState())) {
      return dispatch(
        getAuctionsByKeyword(keyword, pageNumber, filter, getState())
      );
    }
    return Promise.resolve('already fetching auctions...');
  };
}

export function loadMore(pageNumber, time = moment().format()) {
  return {
    type: LOAD_MORE,
    pageNumberAuction: pageNumber + 1,
    time
  };
}

export function filterAuctions(
  filterTypeAuction,
  filterName,
  currentAuctions,
  time = moment().format()
) {
  return {
    type: FILTER_LIST_AUCTIONS,
    auctions: currentAuctions,
    filterTypeAuction: filterTypeAuction,
    filterName: filterName,
    time
  };
}

export function resetAuctionStates(act = '', time = moment().format()) {
  return {
    type: RESET_AUCTION_STATES,
    act: act,
    pageNumberAuction: 1,
    filterName: 'Yêu thích',
    filterTypeAuction: 1,
    pageAuctionsFinished: 1,
    isAuctionsGetByCategory: false,
    categoryId: '',
    categoryName: '',
    isAuctionsGetByKeyword: false,
    keyword: '',
    time
  };
}

export function resetPageNumber(time = moment().format()) {
  return {
    type: RESET_PAGE_NUMBER,
    pageNumberAuction: 1,
    pageAuctionsFinished: 1,
    time
  };
}

function shouldGetAuctions(state: any): boolean {
  const isFetching = state.auction.isFetching;
  if (isFetching) {
    return false;
  }
  return true;
}

function getAuctions(pageNumber, filter = {}, state: any) {
  return dispatch => {
    dispatch(requestListAuctions());
    fetchListAuctions(pageNumber, filter.type)
      .then(data => {
        if (data.status !== 200) return dispatch(errorBadRequest(data.status));
        dispatch(receivedListAuctions(data, filter, state));
      })
      .catch(error => {
        dispatch(errorListAuctions(error));
        dispatch(errorBadRequest(400));
      });
  };
}

function getAuctionsByCategory(
  cateId,
  cateName,
  pageNumber,
  filter = {},
  state: any
) {
  return dispatch => {
    dispatch(requestListAuctions(true, cateId, cateName, false, ''));
    fetchListAuctionsByCategory(cateId, cateName, pageNumber)
      .then(data => {
        if (data.status !== 200) return dispatch(errorBadRequest(data.status));
        dispatch(receivedListAuctions(data, filter, state));
      })
      .catch(error => {
        dispatch(errorListAuctions(error));
        dispatch(errorBadRequest(400));
      });
  };
}

function getAuctionsByKeyword(keyword, pageNumber, filter = {}, state: any) {
  return dispatch => {
    dispatch(requestListAuctions(false, '', '', true, keyword));
    fetchListAuctionsByKeyword(keyword, pageNumber)
      .then(data => {
        if (data.status !== 200) return dispatch(errorBadRequest(data.status));
        dispatch(receivedListAuctions(data, filter, state));
      })
      .catch(error => {
        dispatch(errorListAuctions(error));
        dispatch(errorBadRequest(400));
      });
  };
}

function requestListAuctionsFinished(time = moment().format()) {
  return {
    type: REQUEST_LIST_AUCTIONS_FINISHED,
    isFetchingAuctionsFinish: true,
    time
  };
}

function receivedListAuctionsFinished(
  auctionsFinished,
  state,
  time = moment().format()
) {
  if (state.auction.pageAuctionsFinished !== 1) {
    let oldData = state.auction.auctionsFinished;
    let newData = auctionsFinished.data;
    auctionsFinished.data = [...oldData, ...newData];
  }
  return {
    type: RECEIVED_LIST_AUCTIONS_FINISHED,
    isFetchingAuctionsFinish: false,
    auctionsFinished,
    time
  };
}

function errorListAuctionsFinished(time = moment().format()) {
  return {
    type: ERROR_LIST_AUCTIONS_FINISHED,
    isFetchingAuctionsFinish: false,
    time
  };
}

export function auctionsFinishLoadMore(page: number, time = moment().format()) {
  return {
    type: LOAD_MORE_FINISH,
    pageAuctionsFinished: page + 1,
    time
  };
}

export function getAuctionsFinishedIfNeeded(
  page: number
): (...any) => Promise<any> {
  return (dispatch: any => any, getState: () => boolean): any => {
    if (shouldGetAuctionsFinished(getState())) {
      return dispatch(getAuctionsFinished(page, getState()));
    }
    return Promise.resolve('already fetching auctions...');
  };
}

function shouldGetAuctionsFinished(state: any): boolean {
  const { isFetchingAuctionsFinish } = state.auction;
  if (isFetchingAuctionsFinish) {
    return false;
  }
  return true;
}

function getAuctionsFinished(page: number, state: any) {
  return dispatch => {
    dispatch(requestListAuctionsFinished());
    fetchAuctionsFinished(page)
      .then(data => {
        if (data.status !== 200) return dispatch(errorBadRequest(data.status));
        dispatch(receivedListAuctionsFinished(data, state));
      })
      .catch(error => {
        dispatch(errorListAuctionsFinished(error));
        dispatch(errorBadRequest(400));
      });
  };
}
