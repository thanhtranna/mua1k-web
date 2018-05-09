// @flow
import moment from 'moment';
import {
  ENTER_HOME_VIEW,
  ENTER_LOGIN_VIEW,
  ENTER_PAGE_NOT_FOUND_VIEW,
  ENTER_PROTECTED_VIEW,
  LEAVE_HOME_VIEW,
  LEAVE_LOGIN_VIEW,
  LEAVE_PAGE_NOT_FOUND_VIEW,
  LEAVE_PROTECTED_VIEW,
  ENTER_REGISTER_VIEW,
  LEAVE_REGISTER_VIEW,
  ENTER_PAGE_BAD_REQUEST_VIEW,
  LEAVE_PAGE_BAD_REQUEST_VIEW,
  ENTER_HELP_VIEW,
  LEAVE_HELP_VIEW,
  ENTER_POLICY_VIEW,
  LEAVE_POLICY_VIEW,
  ENTER_TERMS_VIEW,
  LEAVE_TERMS_VIEW,
  ENTER_ADD_NEW_ADDRESS_VIEW,
  LEAVE_ADD_NEW_ADDRESS_VIEW,
  ENTER_ADDRESS_VIEW,
  LEAVE_ADDRESS_VIEW,
  ENTER_COIN_VIEW,
  LEAVE_COIN_VIEW,
  ENTER_CONTACT_VIEW,
  LEAVE_CONTACT_VIEW,
  ENTER_FRIEND_VIEW,
  LEAVE_FRIEND_VIEW,
  ENTER_CHANCE_BUY_HISTORY_VIEW,
  LEAVE_CHANCE_BUY_HISTORY_VIEW,
  ENTER_POINT_VIEW,
  LEAVE_POINT_VIEW,
  ENTER_WIN_HISTORY_VIEW,
  LEAVE_WIN_HISTORY_VIEW,
  ENTER_POINT_EXCHANGE_HISTORY_VIEW,
  LEAVE_POINT_EXCHANGE_HISTORY_VIEW,
  ENTER_EDIT_PROFILE_VIEW,
  LEAVE_EDIT_PROFILE_VIEW,
  ENTER_COIN_EXCHANGE_HISTORY_VIEW,
  LEAVE_COIN_EXCHANGE_HISTORY_VIEW
} from '../constants/viewTypes';

export function enterHome(time: string = moment().format()) {
  return {
    type: ENTER_HOME_VIEW,
    currentView: 'Home',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveHome(time: string = moment().format()) {
  return {
    type: LEAVE_HOME_VIEW,
    currentView: 'Home',
    enterTime: null,
    leaveTime: time
  };
}

export function enterPageNotFound(time: string = moment().format()) {
  return {
    type: ENTER_PAGE_NOT_FOUND_VIEW,
    currentView: 'PageNotFound',
    enterTime: time,
    leaveTime: null
  };
}

export function leavePageNotFound(time: string = moment().format()) {
  return {
    type: LEAVE_PAGE_NOT_FOUND_VIEW,
    currentView: 'PageNotFound',
    enterTime: null,
    leaveTime: time
  };
}

export function enterLogin(time: string = moment().format()) {
  return {
    type: ENTER_LOGIN_VIEW,
    currentView: 'Login',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveLogin(time: string = moment().format()) {
  return {
    type: LEAVE_LOGIN_VIEW,
    currentView: 'Login',
    enterTime: null,
    leaveTime: time
  };
}

export function enterRegister(time: string = moment().format()) {
  return {
    type: ENTER_REGISTER_VIEW,
    currentView: 'Register',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveRegister(time: string = moment().format()) {
  return {
    type: LEAVE_REGISTER_VIEW,
    currentView: 'Register',
    enterTime: null,
    leaveTime: time
  };
}

export function enterProtected(time: string = moment().format()) {
  return {
    type: ENTER_PROTECTED_VIEW,
    currentView: 'Protected',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveProtected(time: string = moment().format()) {
  return {
    type: LEAVE_PROTECTED_VIEW,
    currentView: 'Protected',
    enterTime: null,
    leaveTime: time
  };
}

export function enterPageBadRequest(time: string = moment().format()) {
  return {
    type: ENTER_PAGE_BAD_REQUEST_VIEW,
    currentView: 'PageBadRequest',
    enterTime: time,
    leaveTime: null
  };
}

export function leavePageBadRequest(time: string = moment().format()) {
  return {
    type: LEAVE_PAGE_BAD_REQUEST_VIEW,
    currentView: 'PageBadRequest',
    enterTime: null,
    leaveTime: time
  };
}

export function enterHelp(time: string = moment().format()) {
  return {
    type: ENTER_HELP_VIEW,
    currentView: 'Help',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveHelp(time: string = moment().format()) {
  return {
    type: LEAVE_HELP_VIEW,
    currentView: 'Help',
    enterTime: null,
    leaveTime: time
  };
}

export function enterPolicy(time: string = moment().format()) {
  return {
    type: ENTER_POLICY_VIEW,
    currentView: 'PrivacyPolicy',
    enterTime: time,
    leaveTime: null
  };
}

export function leavePolicy(time: string = moment().format()) {
  return {
    type: LEAVE_POLICY_VIEW,
    currentView: 'PrivacyPolicy',
    enterTime: null,
    leaveTime: time
  };
}

export function enterTerms(time: string = moment().format()) {
  return {
    type: ENTER_TERMS_VIEW,
    currentView: 'Terms',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveTerms(time: string = moment().format()) {
  return {
    type: LEAVE_TERMS_VIEW,
    currentView: 'Terms',
    enterTime: null,
    leaveTime: time
  };
}
export function enterAddNewAddress(time: string = moment().format()) {
  return {
    type: ENTER_ADD_NEW_ADDRESS_VIEW,
    currentView: 'AddNewAddress',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveAddNewAddress(time: string = moment().format()) {
  return {
    type: LEAVE_ADD_NEW_ADDRESS_VIEW,
    currentView: 'AddNewAddress',
    enterTime: null,
    leaveTime: time
  };
}

export function enterAddress(time: string = moment().format()) {
  return {
    type: ENTER_ADDRESS_VIEW,
    currentView: 'Address',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveAddress(time: string = moment().format()) {
  return {
    type: LEAVE_ADDRESS_VIEW,
    currentView: 'Address',
    enterTime: null,
    leaveTime: time
  };
}

export function enterCoin(time: string = moment().format()) {
  return {
    type: ENTER_COIN_VIEW,
    currentView: 'Coin',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveCoin(time: string = moment().format()) {
  return {
    type: LEAVE_COIN_VIEW,
    currentView: 'Coin',
    enterTime: null,
    leaveTime: time
  };
}

export function enterContact(time: string = moment().format()) {
  return {
    type: ENTER_CONTACT_VIEW,
    currentView: 'Contact',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveContact(time: string = moment().format()) {
  return {
    type: LEAVE_CONTACT_VIEW,
    currentView: 'Contact',
    enterTime: null,
    leaveTime: time
  };
}

export function enterFriend(time: string = moment().format()) {
  return {
    type: ENTER_FRIEND_VIEW,
    currentView: 'Friend',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveFriend(time: string = moment().format()) {
  return {
    type: LEAVE_FRIEND_VIEW,
    currentView: 'Friend',
    enterTime: null,
    leaveTime: time
  };
}

export function enterPointExchangeHistory(time: string = moment().format()) {
  return {
    type: ENTER_POINT_EXCHANGE_HISTORY_VIEW,
    currentView: 'Terms',
    enterTime: time,
    leaveTime: null
  };
}

export function leavePointExchangeHistory(time: string = moment().format()) {
  return {
    type: LEAVE_POINT_EXCHANGE_HISTORY_VIEW,
    currentView: 'Terms',
    enterTime: null,
    leaveTime: time
  };
}

export function enterChanceBuyHistory(time: string = moment().format()) {
  return {
    type: ENTER_CHANCE_BUY_HISTORY_VIEW,
    currentView: 'Terms',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveChanceBuyHistory(time: string = moment().format()) {
  return {
    type: LEAVE_CHANCE_BUY_HISTORY_VIEW,
    currentView: 'Terms',
    enterTime: null,
    leaveTime: time
  };
}

export function enterCoinExchangeHistory(time: string = moment().format()) {
  return {
    type: ENTER_COIN_EXCHANGE_HISTORY_VIEW,
    currentView: 'Terms',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveCoinExchangeHistory(time: string = moment().format()) {
  return {
    type: LEAVE_COIN_EXCHANGE_HISTORY_VIEW,
    currentView: 'Terms',
    enterTime: null,
    leaveTime: time
  };
}

export function enterPoint(time: string = moment().format()) {
  return {
    type: ENTER_POINT_VIEW,
    currentView: 'Point',
    enterTime: time,
    leaveTime: null
  };
}

export function leavePoint(time: string = moment().format()) {
  return {
    type: LEAVE_POINT_VIEW,
    currentView: 'Point',
    enterTime: null,
    leaveTime: time
  };
}

export function enterWinHistory(time: string = moment().format()) {
  return {
    type: ENTER_WIN_HISTORY_VIEW,
    currentView: 'WinHistory',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveWinHistory(time: string = moment().format()) {
  return {
    type: LEAVE_WIN_HISTORY_VIEW,
    currentView: 'WinHistory',
    enterTime: null,
    leaveTime: time
  };
}

export function enterEditProfile(time: string = moment().format()) {
  return {
    type: ENTER_EDIT_PROFILE_VIEW,
    currentView: 'EditProfile',
    enterTime: time,
    leaveTime: null
  };
}

export function leaveEditProfile(time: string = moment().format()) {
  return {
    type: LEAVE_EDIT_PROFILE_VIEW,
    currentView: 'EditProfile',
    enterTime: null,
    leaveTime: time
  };
}
