// @flow weak
import {
  ERROR_BAD_REQUEST
} from "../constants/errorType";
import moment from "moment/moment";

const initialState = {
  errorStatus: 0
};

const currentTime = moment().format();

export default function (
  state = initialState,
  action
) {
  switch (action.type) {
    case ERROR_BAD_REQUEST:
      console.log(action);
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        errorStatus: action && action.errorStatus ? action && action.errorStatus : initialState.errorStatus
      };
    default:
      return { ...state
      };
  }
}