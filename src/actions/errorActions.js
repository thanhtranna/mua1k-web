// @flow weak
import { ERROR_BAD_REQUEST } from '../constants/errorType';
import moment from 'moment/moment';

export function errorBadRequest(status, time = moment().format()) {
  return {
    type: ERROR_BAD_REQUEST,
    errorStatus: status || 400,
    time
  };
}
