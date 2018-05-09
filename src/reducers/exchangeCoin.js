// @flow weak
import {
  REQUEST_EXCHANGE_COIN,
  RECEIVED_EXCHANGE_COIN,
  ERROR_EXCHANGE_COIN,
  SET_POINT,
} from "../constants/exchangeCoinType";
import moment from "moment/moment";

const initialState = {
  point: 0,
  isFetching: false,
  isSending: false,
  isError: false,
  message: '',
};

const currentTime = moment().format();

export default function (
  state = initialState,
  action
) {
  switch (action.type) {
    case REQUEST_EXCHANGE_COIN:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        isSending: action && action.isSending ? action && action.isSending : initialState.isSending
      };
    case RECEIVED_EXCHANGE_COIN:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        isSending: action && action.isSending ? action && action.isSending : initialState.isSending,
        isError: false,
        message: 'exchange_coin_success',
      };
    case ERROR_EXCHANGE_COIN:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        isSending: action && action.isSending ? action && action.isSending : initialState.isSending,
        isError: true,
        message: action.msg,
      };
    case SET_POINT:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        point: action && action.point ? action && action.point : initialState.point,
      };
    default:
      return { ...state
      };
  }
}