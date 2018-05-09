// @flow weak
import {
  REQUEST_LIST_AUCTIONS_FINISHED,
  RECEIVED_LIST_AUCTIONS_FINISHED,
  ERROR_LIST_AUCTIONS_FINISHED,
  ERROR_LIST_AUCTIONS,
  RECEIVED_LIST_AUCTIONS,
  REQUEST_LIST_AUCTIONS,
  LOAD_MORE,
  FILTER_LIST_AUCTIONS,
  RESET_AUCTION_STATES,
  LOAD_MORE_FINISH,
  UPDATE_KEYWORD,
} from "../constants/auctionType";
import moment from "moment/moment";

const initialState = {
  auctionsFinished: [],
  isFetching: false,
  isFetchingAuctionsFinish: false,
  auctions: [],
  act: '', //behavie search or category click
  pageNumberAuction: 1,
  filterTypeAuction: 1,
  filterName: 'Yêu thích',
  pageAuctionsFinished: 1,
  isAuctionsGetByCategory: false,
  categoryId: '',
  categoryName: '',
  isAuctionsGetByKeyword: false,
  keyword: '',
};

const currentTime = moment().format();

export default function (
  state = initialState,
  action
) {
  switch (action.type) {
    case REQUEST_LIST_AUCTIONS_FINISHED:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        isFetchingAuctionsFinish: action && action.isFetchingAuctionsFinish ?
          action && action.isFetchingAuctionsFinish : initialState.isFetchingAuctionsFinish
      };

    case RECEIVED_LIST_AUCTIONS_FINISHED:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        isFetchingAuctionsFinish: action && action.isFetchingAuctionsFinish ?
          action && action.isFetchingAuctionsFinish : initialState.isFetchingAuctionsFinish,
        auctionsFinished: action && action.auctionsFinished && action.auctionsFinished.data ?
          action && action.auctionsFinished && action.auctionsFinished.data : initialState.auctionsFinished
      };

    case ERROR_LIST_AUCTIONS_FINISHED:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        isFetchingAuctionsFinish: action && action.isFetchingAuctionsFinish ?
          action && action.isFetchingAuctionsFinish : initialState.isFetchingAuctionsFinish
      };
    case LOAD_MORE_FINISH:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        pageAuctionsFinished: action && action.pageAuctionsFinished ?
          action && action.pageAuctionsFinished : initialState.pageAuctionsFinished
      };
    case REQUEST_LIST_AUCTIONS:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        isFetching: action && action.isFetching ? action && action.isFetching : initialState.isFetching,
        isAuctionsGetByCategory: action && action.isAuctionsGetByCategory ? action && action.isAuctionsGetByCategory : initialState.isAuctionsGetByCategory,
        categoryId: action && action.categoryId ? action && action.categoryId : initialState.categoryId,
        categoryName: action && action.categoryName ? action && action.categoryName : initialState.categoryName,
        isAuctionsGetByKeyword: action && action.isAuctionsGetByKeyword ? action && action.isAuctionsGetByKeyword : initialState.isAuctionsGetByKeyword,
        keyword: action && action.keyword ? action && action.keyword : initialState.keyword
      };

    case RECEIVED_LIST_AUCTIONS:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        isFetching: action && action.isFetching ? action && action.isFetching : initialState.isFetching,
        auctions: action && action.auctions ? action && action.auctions : initialState.auctions,
        filterTypeAuction: action && action.filterTypeAuction ? action && action.filterTypeAuction : initialState.filterTypeAuction,
        filterName: action && action.filterName ? action && action.filterName : initialState.filterName
      };

    case ERROR_LIST_AUCTIONS:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        isFetching: action && action.isFetching ? action && action.isFetching : initialState.isFetching
      };
    case UPDATE_KEYWORD:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        keyword: action && action.keyword ? action && action.keyword : initialState.keyword,
        act: action && action.act ? action && action.act : initialState.act
      };
    case LOAD_MORE:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        pageNumberAuction: action && action.pageNumberAuction ? action && action.pageNumberAuction : initialState.pageNumberAuction
      };
    case FILTER_LIST_AUCTIONS:
      {
        return {
          ...state,
          actionTime: action && action.time ? action && action.time : currentTime,
          auctions: action && action.auctions ? action && action.auctions : initialState.auctions,
          filterTypeAuction: action && action.filterTypeAuction ? action && action.filterTypeAuction : initialState.filterTypeAuction,
          filterName: action && action.filterName ? action && action.filterName : initialState.filterName
        };
      }
    case RESET_AUCTION_STATES:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        act: action && action.act ? action && action.act : initialState.act,
        pageNumberAuction: action && action.pageNumberAuction ? action && action.pageNumberAuction : initialState.pageNumberAuction,
        filterName: action && action.filterName ? action && action.filterName : initialState.filterName,
        filterTypeAuction: action && action.filterTypeAuction ? action && action.filterTypeAuction : initialState.filterTypeAuction,
        pageAuctionsFinished: action && action.pageAuctionsFinished ? action && action.pageAuctionsFinished : initialState.pageAuctionsFinished,
        isAuctionsGetByCategory: action && action.isAuctionsGetByCategory ? action && action.isAuctionsGetByCategory : initialState.isAuctionsGetByCategory,
        categoryId: action && action.categoryId ? action && action.categoryId : initialState.categoryId,
        categoryName: action && action.categoryName ? action && action.categoryName : initialState.categoryName,
        isAuctionsGetByKeyword: action && action.isAuctionsGetByKeyword ? action && action.isAuctionsGetByKeyword : initialState.isAuctionsGetByKeyword,
        keyword: action && action.keyword ? action && action.keyword : initialState.keyword,
      };
    default:
      return { ...state
      };
  }
}