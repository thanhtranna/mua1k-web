// @flow weak
import {
    REQUEST_POINT_HISTORY,
    RECEIVED_POINT_HISTORY,
    ERROR_POINT_HISTORY,
} from "../constants/pointHistoryType";
import moment from "moment/moment";

const initialState = {
    pointHistory: [],
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
        case REQUEST_POINT_HISTORY:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };

        case RECEIVED_POINT_HISTORY:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching: action && action.isFetching ?  action && action.isFetching : initialState.isFetching,
                pointHistory: action && action.pointHistory && action.pointHistory.docs ?  action && action.pointHistory && action.pointHistory.docs : initialState.pointHistory,
                page: action && action.pointHistory && action.pointHistory.page ?  action && action.pointHistory && action.pointHistory.page : initialState.page,
                pages: action && action.pointHistory && action.pointHistory.pages ?  action && action.pointHistory && action.pointHistory.pages : initialState.pages,
                total: action && action.pointHistory && action.pointHistory.total ?  action && action.pointHistory && action.pointHistory.total : initialState.total,
                limit: action && action.pointHistory && action.pointHistory.limit ?  action && action.pointHistory && action.pointHistory.limit : initialState.limit,
            };

        case ERROR_POINT_HISTORY:
            return {
                ...state,
                actionTime: action && action.time ?  action && action.time : currentTime,
                isFetching:  action && action.isFetching ?  action && action.isFetching : initialState.isFetching
            };
        default:
            return { ...state };
    }
}
