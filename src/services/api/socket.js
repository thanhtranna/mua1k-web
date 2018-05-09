import openSocket from 'socket.io-client';
import request from '../promisedHttpRequest';

let BASE_URL_TOKUBUY = process.env.REACT_APP_ROOT_API_TOKUBUY;

if (process.env.REACT_APP_ENV === 'staging') {
  BASE_URL_TOKUBUY = process.env.REACT_APP_ROOT_API_STG_TOKUBUY;
}

const socket = openSocket('https://stg-tokubuy.bap.jp');

export const sendMessage = message => {
  const accessToken = localStorage.getItem('x-access-token');
  const url = `${BASE_URL_TOKUBUY}send-message`;
  return request.post(url, {
    message: message,
    type: 1
  }, accessToken);
};

export const listenMessage = callback => {
  socket.on('message', message => callback(message));
};

export const listenWinner = callback => {
  socket.on('notifyWinner', () => callback());
};

export const listenSoldOut = callback => {
  socket.on('soldOut', () => callback());
};