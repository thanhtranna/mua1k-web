import {
    CHANGE_WEB_VIEW,
} from '../constants/webViewType';
import moment from 'moment';

const initialState = {
    pageKey: 'help',
};

const currentTime = moment().format();

export default function (
    state = initialState,
    action
) {
    switch (action.type) {
        case CHANGE_WEB_VIEW:
            return {
                ...state,
                pageKey: action.pageKey,
                actionTime: action && action.time ?  action && action.time : currentTime,
            };
        default:
            return { ...state };
    }
}
