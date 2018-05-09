// @flow weak
import {
  REQUEST_LIST_CAMPAIGNS,
  RECEIVED_LIST_CAMPAIGNS,
  ERROR_LIST_CAMPAIGNS,
} from "../constants/campaignType";
import moment from "moment/moment";

const initialState = {
  campaigns: [],
  isFetching: false
};

const currentTime = moment().format();

export default function (
  state = initialState,
  action
) {
  switch (action.type) {
    case REQUEST_LIST_CAMPAIGNS:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        isFetching: action && action.isFetching ? action && action.isFetching : initialState.isFetching
      };

    case RECEIVED_LIST_CAMPAIGNS:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        isFetching: action && action.isFetching ? action && action.isFetching : initialState.isFetching,
        campaigns: action && action.campaigns && action.campaigns.data ? action && action.campaigns && action.campaigns.data : initialState.campaigns
      };

    case ERROR_LIST_CAMPAIGNS:
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