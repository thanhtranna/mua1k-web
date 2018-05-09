// @flow
import auth from '../services/auth';
import {
  postLoginPlatform,
  postRegister,
  postLoginServer,
  postLogin,
  getUserInfo,
  changeNickname,
  changeAvatar
} from '../services/api';

import {
  DISCONNECT_USER,
  START_EDIT_PROFILE,
  STOP_EDIT_PROFILE,
  CHECK_IF_USER_IS_AUTHENTICATED,
  REQUEST_LOG_USER,
  RECEIVED_LOG_USER,
  REQUEST_REG_USER,
  RECEIVED_REG_USER,
  ERROR_REG_USER,
  ERROR_LOG_PLATFORM,
  RECEIVED_USER_INFO,
  REQUEST_USER_INFO,
  ERROR_USER_INFO,
  RESET_USER_STATES
} from '../constants/userAuthType';
import moment from 'moment';

/**
 *
 * set user isAuthenticated to false and clear all app localstorage:
 *
 * @export
 * @returns {action} action
 */
export function disconnectUser() {
  auth.clearAllAppStorage();
  return {
    type: DISCONNECT_USER
  };
}

export function startEditProfile() {
  return {
    type: START_EDIT_PROFILE
  };
}

export function updateProfile(newInfo: any, accessToken) {
  return dispatch => {
    dispatch(startEditProfile());
    changeNickname(newInfo.nickname, accessToken)
      .then(res => {
        if (res.status !== 200) throw res;

        return newInfo.avatar.get('avatar') !== 'undefined' ?
          changeAvatar(newInfo.avatar, accessToken) :
          res;
      })
      .then(res => {
        if (res.status !== 200) throw res;
        return getUserInfo(accessToken);
      })
      .then(res =>
        dispatch(receivedUserInfo(res.data, 'Change profile successfull!'))
      )
      .catch(error => dispatch(stopEditProfile(error.message)));
  };
}

export function reloadUserData(dispatch, accessToken) {
  getUserInfo(accessToken)
    .then(res => dispatch(receivedUserInfo(res.data)))
    .catch(error => dispatch(errorLoginUser(error.message)));
}

export function stopEditProfile(msg) {
  return {
    type: STOP_EDIT_PROFILE,
    msg
  };
}

/**
 *
 * check if user is connected by looking at locally stored
 * - token
 * - user fonrmation
 *
 * @export
 * @returns {action} action
 */
export function checkUserIsConnected() {
  const token: any = auth.getToken();
  const user: any = auth.getUserInfo();
  const checkUserHasId = (obj: any) => obj && obj._id;
  const isAuthenticated = token && checkUserHasId(user) ? true : false;

  return {
    type: CHECK_IF_USER_IS_AUTHENTICATED,
    token,
    ...user,
    isAuthenticated
  };
}

function requestLoginUser(time = moment().format()) {
  return {
    type: REQUEST_LOG_USER,
    isFetching: true,
    time
  };
}

function receivedLoginUser(data, time = moment().format()) {
  return {
    type: RECEIVED_LOG_USER,
    isFetching: false,
    data,
    time
  };
}

function errorLoginUser(msg, time = moment().format()) {
  return {
    type: ERROR_LOG_PLATFORM,
    isFetching: false,
    msg,
    time
  };
}

function requestUserInfo(time = moment().format()) {
  return {
    type: REQUEST_USER_INFO,
    isFetching: true,
    time
  };
}

function receivedUserInfo(data, msg, time = moment().format()) {
  return {
    type: RECEIVED_USER_INFO,
    isFetching: false,
    isEditting: false,
    errorMessage: msg,
    data,
    time
  };
}

function errorUserInfo(time = moment().format()) {
  return {
    type: ERROR_USER_INFO,
    isFetching: false,
    time
  };
}

/**
 *
 *  user login
 *
 * @param {string} login user login
 * @param {string} password usepasswordr
 * @returns {Promise<any>} promised action
 */
function logUser(username, password) {
  return dispatch => {
    dispatch(requestLoginUser());
    postLogin(username, password)
      .then(res => {
        if (res.status !== 200) throw res;
        console.log(console.log('Response data login server: ', res));
        dispatch(receivedLoginUser(res.data));
        return getUserInfo(res.data);
      })
      .then(res => dispatch(receivedUserInfo(res.data)))
      .catch(error => dispatch(errorLoginUser(error.message)));
    // postLoginPlatform(username, password)
    //   .then(res => {
    //     if (res.status !== 200) throw res;
    //     console.log('Response data login platform: ', res);

    //     return postLoginServer(res.data.access_token);
    //   })
    //   .then(res => {
    //     if (res.status !== 200) throw res;
    //     dispatch(receivedLoginUser(res.data));
    //     return getUserInfo(res.data);
    //   })
    //   .then(res => dispatch(receivedUserInfo(res.data)))
    //   .catch(error => dispatch(errorLoginUser(error.message)));
  };
}

export function logUserIfNeeded(
  username: string,
  password: string
): (...any) => Promise < any > {
  return (dispatch: any => any, getState: () => boolean): any => {
    if (shouldLogUser(getState())) {
      return dispatch(logUser(username, password));
    }
    return Promise.resolve('already logged in...');
  };
}

function shouldLogUser(state: any): boolean {
  const isLogging = state.userAuth.isLogging;
  if (isLogging) {
    return false;
  }
  return true;
}

function requestRegisterUser(time = moment().format()) {
  return {
    type: REQUEST_REG_USER,
    isFetching: true,
    time
  };
}

function receivedRegisterUser(data, time = moment().format()) {
  return {
    type: RECEIVED_REG_USER,
    isFetching: false,
    data,
    time
  };
}

function errorRegisterUser(time = moment().format()) {
  return {
    type: ERROR_REG_USER,
    isFetching: false,
    time
  };
}

export function registerUser(
  username: string,
  email: string,
  password: string,
  confirm_password: string
): (...any) => Promise < any > {
  return (dispatch: any => any, getState: () => boolean): any => {
    if (shouldRegUser(getState())) {
      return dispatch(regUser(username, email, password, confirm_password));
    }
    return Promise.resolve('already logged in...');
  };
}

function shouldRegUser(state: any): boolean {
  const isRegistering = state.userAuth.isRegistering;
  if (isRegistering) {
    return false;
  }
  return true;
}

function regUser(username, email, password, confirm_password) {
  return dispatch => {
    dispatch(requestRegisterUser());
    postRegister(username, email, password, confirm_password)
      .then(data => {
        console.log('Data register user: ', data);
        dispatch(receivedRegisterUser(data))
      })
      .catch(error => dispatch(errorRegisterUser(error)));
  };
}

// get user info
function getUserInfoData(accessToken) {
  return dispatch => {
    dispatch(requestUserInfo());
    getUserInfo(accessToken)
      .then(res => {
        if (res.status !== 200) return dispatch(errorUserInfo());
        return dispatch(receivedUserInfo(res.data));
      })
      .catch(error => dispatch(errorUserInfo()));
  };
}

export function fetchUserInfoDataIfNeeded(): (...any) => Promise < any > {
  return (dispatch: any => any, getState: () => boolean): any => {
    if (shouldGetUserInfo(getState())) {
      const accessToken = auth.getToken();
      if (accessToken) {
        const isTokenExpired = auth.isExpiredToken(auth.getToken());
        if (!isTokenExpired) return dispatch(getUserInfoData(accessToken));
      }
      return dispatch(errorUserInfo());
    }
    return Promise.resolve('already logged in...');
  };
}

export function resetUserStates(time = moment().format()) {
  return {
    type: RESET_USER_STATES,
    time
  };
}

function shouldGetUserInfo(state: any): boolean {
  const isLogging = state.userAuth.isFetching;
  if (isLogging) {
    return false;
  }
  return true;
}