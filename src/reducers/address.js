// @flow weak
import {
  REQUEST_LIST_ADDRESS,
  RECEIVED_LIST_ADDRESS,
  ERROR_LIST_ADDRESS,
} from "../constants/addressType";
import moment from "moment/moment";

const initialState = {
  address: [],
  isFetching: false,
};

const currentTime = moment().format();

export default function (
  state = initialState,
  action
) {
  switch (action.type) {
    case REQUEST_LIST_ADDRESS:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        isFetching: action && action.isFetching ? action && action.isFetching : initialState.isFetching
      };

    case RECEIVED_LIST_ADDRESS:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        isFetching: action && action.isFetching ? action && action.isFetching : initialState.isFetching,
        address: action && action.address && action.address.data ? action && action.address && action.address.data : initialState.address
      };

    case ERROR_LIST_ADDRESS:
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