import { CHANGE_WEB_VIEW } from '../constants/webViewType';
import moment from 'moment';

export function changePage(
  pageKey,
  time = moment().format()
): (...any) => Promise<any> {
  return (dispatch: any => any): any => {
    return dispatch({
      type: CHANGE_WEB_VIEW,
      pageKey,
      time
    });
  };
}
