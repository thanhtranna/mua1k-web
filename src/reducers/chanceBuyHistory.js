// @flow weak
import {
  REQUEST_CHANCE_BUY_HISTORY,
  RECEIVED_CHANCE_BUY_HISTORY,
  ERROR_CHANCE_BUY_HISTORY,
} from "../constants/chanceBuyHistoryType";
import moment from "moment/moment";

const initialState = {
  chanceBuyHistories: [],
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
    case REQUEST_CHANCE_BUY_HISTORY:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        isFetching: action && action.isFetching ? action && action.isFetching : initialState.isFetching
      };

    case RECEIVED_CHANCE_BUY_HISTORY:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        isFetching: action && action.isFetching ? action && action.isFetching : initialState.isFetching,
        chanceBuyHistories: action && action.chanceBuyHistory && action.chanceBuyHistory.docs ? action && action.chanceBuyHistory && action.chanceBuyHistory.docs : initialState.chanceBuyHistories,
        page: action && action.chanceBuyHistory && action.chanceBuyHistory.page ? action && action.chanceBuyHistory && action.chanceBuyHistory.page : initialState.page,
        pages: action && action.chanceBuyHistory && action.chanceBuyHistory.pages ? action && action.chanceBuyHistory && action.chanceBuyHistory.pages : initialState.pages,
        total: action && action.chanceBuyHistory && action.chanceBuyHistory.total ? action && action.chanceBuyHistory && action.chanceBuyHistory.total : initialState.total,
        limit: action && action.chanceBuyHistory && action.chanceBuyHistory.limit ? action && action.chanceBuyHistory && action.chanceBuyHistory.limit : initialState.limit,
      };

    case ERROR_CHANCE_BUY_HISTORY:
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