// @flow weak
import {
  REQUEST_COIN_EXCHANGE_HISTORY,
  RECEIVED_COIN_EXCHANGE_HISTORY,
  ERROR_COIN_EXCHANGE_HISTORY,
} from "../constants/coinExchangeType";
import moment from "moment/moment";

const initialState = {
  coinExchangeHistories: [],
  page: '1',
  pages: 1,
  total: 1,
  limit: 10,
  isFetching: false
};

const currentTime = moment().format();

export default function (
  state = initialState,
  action
) {
  switch (action.type) {
    case REQUEST_COIN_EXCHANGE_HISTORY:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        isFetching: action && action.isFetching ? action && action.isFetching : initialState.isFetching
      };

    case RECEIVED_COIN_EXCHANGE_HISTORY:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        isFetching: action && action.isFetching ? action && action.isFetching : initialState.isFetching,
        coinExchangeHistories: action && action.coinExchangeHistory && action.coinExchangeHistory.docs ? action && action.coinExchangeHistory && action.coinExchangeHistory.docs : initialState.coinExchangeHistories,
        page: action && action.coinExchangeHistory && action.coinExchangeHistory.page ? action && action.coinExchangeHistory && action.coinExchangeHistory.page : initialState.page,
        pages: action && action.coinExchangeHistory && action.coinExchangeHistory.pages ? action && action.coinExchangeHistory && action.coinExchangeHistory.pages : initialState.pages,
        total: action && action.coinExchangeHistory && action.coinExchangeHistory.total ? action && action.coinExchangeHistory && action.coinExchangeHistory.total : initialState.total,
        limit: action && action.coinExchangeHistory && action.coinExchangeHistory.limit ? action && action.coinExchangeHistory && action.coinExchangeHistory.limit : initialState.limit,
      };

    case ERROR_COIN_EXCHANGE_HISTORY:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        isFetching: action && action.isFetching ? action && action.isFetching : initialState.isFetching
      };
    default:
      return { ...state
      };
  }
}