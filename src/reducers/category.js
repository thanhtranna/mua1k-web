// @flow weak
import {
  ERROR_LIST_CATEGORIES,
  RECEIVED_LIST_CATEGORIES,
  REQUEST_LIST_CATEGORIES
} from "../constants/categoryType";
import moment from "moment/moment";

const initialState = {
  categories: [],
  isFetching: false
};

const currentTime = moment().format();

export default function (
  state = initialState,
  action
) {
  switch (action.type) {
    case REQUEST_LIST_CATEGORIES:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        isFetching: action && action.isFetching ? action && action.isFetching : initialState.isFetching
      };

    case RECEIVED_LIST_CATEGORIES:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        isFetching: action && action.isFetching ? action && action.isFetching : initialState.isFetching,
        categories: action && action.categories && action.categories.data ? action && action.categories && action.categories.data : initialState.categories
      };

    case ERROR_LIST_CATEGORIES:
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