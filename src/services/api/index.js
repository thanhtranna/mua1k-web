// @flow weak
import {
  grant_type,
  client_id,
  client_secret,
  device,
  deviceToken
} from '../../constants/common';
import request from '../promisedHttpRequest';
import { fetchListCategories } from './category';
import { fetchListContactCategories } from './contact';
import { postSendContact } from './contact';
import { fetchListAddress } from './address';
import { fetchListAuctions } from './auction';
import { fetchListAuctionsByCategory } from './auction';
import { fetchListCampaigns } from './campaign';
import { fetchAuctionsFinished } from './auction';
import { fetchListAuctionsByKeyword } from './auction';
import { fetchPointHistory } from './pointHistory';
import { postExchangeCoin } from './exchangeCoin';
import { fetchChanceBuyHistory } from './chanceBuyHistory';
import { fetchCoinExchangeHistory } from './coinExchangeHistory';
import {
  sendMessage,
  listenMessage,
  listenWinner,
  listenSoldOut
} from './socket';

let BASE_URL_TOKUBUY = process.env.REACT_APP_ROOT_API_TOKUBUY;
let BASE_URL_PLATFORM = process.env.REACT_APP_ROOT_API_PLATFORM;

if (process.env.REACT_APP_ENV === 'staging') {
  BASE_URL_TOKUBUY = process.env.REACT_APP_ROOT_API_STG_TOKUBUY;
  BASE_URL_PLATFORM = process.env.REACT_APP_ROOT_API_STG_PLATFORM;
}

export const postLoginServer = accessToken => {
  const url = `${BASE_URL_TOKUBUY}login/callback-server`;
  const data = {
    accessToken,
    deviceToken
  };
  return request.post(url, data);
};

export const postLogin = (email, password) => {
  const url = `${BASE_URL_TOKUBUY}login`;
  const data = {
    email,
    password
  };
  return request.post(url, data);
};

export const changeNickname = (nickname, accessToken) => {
  const url = `${BASE_URL_TOKUBUY}user/me/edit-nickname`;
  const data = {
    accessToken,
    nickname
  };
  return request.put(url, data, accessToken);
};

export const changeAvatar = (avatar, accessToken) => {
  const url = `${BASE_URL_TOKUBUY}user/me/change-avatar`;
  const data = avatar;
  return request.post(url, data, accessToken);
};

export const postRegister = (username, email, password, confirm_password) => {
  const url = `${BASE_URL_TOKUBUY}register`;
  const data = {
    username,
    email,
    password,
    confirm_password
  };
  return request.post(url, data);
};

export const getUserInfo = accessToken => {
  const url = `${BASE_URL_TOKUBUY}user/me`;
  return request.get(url, accessToken);
};

export {
  fetchListCategories,
  fetchListContactCategories,
  postSendContact,
  fetchListAddress,
  fetchListAuctions,
  fetchListAuctionsByCategory,
  fetchListCampaigns,
  fetchAuctionsFinished,
  fetchListAuctionsByKeyword,
  sendMessage,
  listenMessage,
  listenWinner,
  listenSoldOut,
  fetchPointHistory,
  postExchangeCoin,
  fetchChanceBuyHistory,
  fetchCoinExchangeHistory
};
