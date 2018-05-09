// @flow weak
import moment from 'moment';
import { fetchListCampaigns } from '../services/api';
import {
  REQUEST_LIST_CAMPAIGNS,
  RECEIVED_LIST_CAMPAIGNS,
  ERROR_LIST_CAMPAIGNS
} from '../constants/campaignType';
import { errorBadRequest } from './errorActions';

function requestListCampaigns(time = moment().format()) {
  return {
    type: REQUEST_LIST_CAMPAIGNS,
    isFetching: true,
    time
  };
}

function receivedListCampaigns(data, time = moment().format()) {
  return {
    type: RECEIVED_LIST_CAMPAIGNS,
    isFetching: false,
    campaigns: data,
    time
  };
}

function errorListCampaigns(time = moment().format()) {
  return {
    type: ERROR_LIST_CAMPAIGNS,
    isFetching: false,
    time
  };
}

export function getCampaignsIfNeeded(): (...any) => Promise<any> {
  return (dispatch: any => any, getState: () => boolean): any => {
    if (shouldGetCampaigns(getState())) {
      return dispatch(getCampaigns());
    }
    return Promise.resolve('already fetching campaigns...');
  };
}

function shouldGetCampaigns(state: any): boolean {
  const isFetching = state.campaign.isFetching;
  if (isFetching) {
    return false;
  }
  return true;
}

function getCampaigns() {
  return dispatch => {
    dispatch(requestListCampaigns());
    fetchListCampaigns()
      .then(data => {
        if (data.status !== 200) return dispatch(errorBadRequest(data.status));
        dispatch(receivedListCampaigns(data));
      })
      .catch(error => {
        dispatch(errorListCampaigns(error));
        dispatch(errorBadRequest(400));
      });
  };
}
