// @flow weak
import moment                 from 'moment';
import auth                   from '../services/auth';

import {
    DISCONNECT_USER,
    START_EDIT_PROFILE,
    STOP_EDIT_PROFILE,
    CHECK_IF_USER_IS_AUTHENTICATED,
    ERROR_LOG_USER,
    RECEIVED_LOG_USER,
    REQUEST_LOG_USER,
    RECEIVED_REG_USER,
    REQUEST_REG_USER,
    ERROR_LOG_PLATFORM,
    RECEIVED_USER_INFO,
    REQUEST_USER_INFO,
    ERROR_USER_INFO,
    RESET_USER_STATES,
} from '../constants/userAuthType'
import { userDataKey } from "../constants/common";

// --------------------------------
// REDUCER
// --------------------------------
const user = auth.getUserInforByField();
const initialState = {
    // actions details
    isFetching:      false,
    isEditting: false,
    isLogging:       false,
    isRegistering:      false,
    time:            '',

    // userInfos
    /* eslint-disable no-mixed-operators */
    id: user && user._id || '',
    uid: user && user.uid || '',
    coin: user && user.coin || 0,
    point: user && user.point || 0,
    email: user && user.email || '',
    isCheckin: user && user.isCheckin || false,
    nickname: user && user.nickname || '',
    valueCheckin: user && user.valueCheckin || 0,
    avatar: user && user.avatar && user.avatar.thumb || '/images/avatar.jpg',

    token: auth.getToken(),
    isAuthenticated: auth.isAuthenticated(),   // authentication status (token based auth)
    isAccountCreated: false,
    isError: false,
    errorMessage: ''
};

export default function (
state = initialState,
action
) {
const currentTime = moment().format();

switch (action.type) {

    case CHECK_IF_USER_IS_AUTHENTICATED:
        return {
            ...state,
            actionTime:      currentTime,
            isAuthenticated: action.isAuthenticated,
            token:           action.token || initialState.token,
            id:              action.user && action.user.id         ? action.user.id:        initialState.id,
            login:           action.user && action.user.login      ? action.user.login:     initialState.login,
            firstname:       action.user && action.user.firstname  ? action.user.firstname: initialState.firstname,
            lastname:        action.user && action.user.lastname   ? action.user.lastname:  initialState.firstname
        };

    case DISCONNECT_USER:
        return {
            ...state,
            actionTime:      currentTime,
            isAuthenticated: false,
            isError:         false,
            token:           initialState.token,
            id:              initialState.id,
            uid:             initialState.uid,
            coin:            initialState.coin,
            point:           initialState.point,
            email:           initialState.email,
            isCheckin:       initialState.isCheckin,
            nickname:        initialState.nickname,
            valueCheckin:    initialState.valueCheckin,
            avatar:          initialState.avatar
        };

    case START_EDIT_PROFILE:
        return {
            ...state,
            actionTime: currentTime,
            isEditting:  true
        };

     case STOP_EDIT_PROFILE:
        return {
            ...state,
            actionTime: currentTime,
            errorMessage: action && action.msg ? action && action.msg : initialState.errorMessage,
            isEditting:  false,
            isError: true,
        };

    // user login (get token and userInfo)
    case REQUEST_LOG_USER:
        return {
            ...state,
            actionTime: currentTime,
            isLogging:  true
        };

    case RECEIVED_LOG_USER:
        auth.setToken(action.data);
        return {
            ...state,
            actionTime:      currentTime,
            isAuthenticated: true,
            token:           action.data,
            isError: false,
            errorMessage: '',
            isLogging:       false
        };

    case REQUEST_USER_INFO:
        return {
            ...state,
            actionTime: currentTime,
            isFetching:  true
        };

    case RECEIVED_USER_INFO:
        localStorage.setItem(userDataKey, JSON.stringify(action.data));
        return {
            ...state,
            id: action && action.data && action.data._id,
            uid: action && action.data && action.data.uid,
            coin: action && action.data && action.data.coin,
            point: action && action.data && action.data.point,
            email: action && action.data && action.data.email,
            isCheckin: action && action.data && action.data.isCheckin,
            nickname: action && action.data && action.data.nickname,
            valueCheckin: action && action.data && action.data.valueCheckin,
            avatar: action && action.data && action.data.avatar && action.data.avatar.thumb,
            errorMessage: action && action.errorMessage && action.errorMessage || initialState.errorMessage,
            isFetching: false,
            isEditting: false,
            isError: false,
        };

    case ERROR_USER_INFO:
        localStorage.clear();
        return {
            ...state,
            actionTime:       currentTime,
            isAuthenticated:  false,
            isLogging:        false
        };

    case ERROR_LOG_USER:
        return {
            ...state,
            actionTime:       currentTime,
            isAuthenticated:  false,
            isLogging:        false
        };

    case ERROR_LOG_PLATFORM:
        return {
            ...state,
            actionTime:           currentTime,
            isAuthenticated:      false,
            isLogging:            false,
            isError:              true,
            errorMessage:         action.msg,
        };

    case REQUEST_REG_USER:
        return {
            ...state,
            actionTime: currentTime,
            isRegistering:  true
        };

    case RESET_USER_STATES:
        return {
            ...state,
            actionTime: currentTime,
            errorMessage: action && action.errorMessage ? action && action.errorMessage : initialState.errorMessage,
            isEditting:  action && action.isEditting ? action && action.isEditting : initialState.isEditting,
            isError: action && action.isError ? action && action.isError : initialState.isError,
        };

    case RECEIVED_REG_USER:
        const userRegistered = action.data;
        if (userRegistered.status === 200) {
            return {
                ...state,
                actionTime:       currentTime,
                isAccountCreated: true,
                isError:          false,
                errorMessage:     '',
                isRegistering:    false
            };
        }

        if (userRegistered.status === 422 || userRegistered.status === 400) {
            return {
                ...state,
                actionTime:       currentTime,
                isAccountCreated: false,
                isError:          true,
                errorMessage:     userRegistered.message,
                isRegistering:    false
            };
        }

        // temp
        return {
            ...state
        };

    default:
        return state;
    }
}
