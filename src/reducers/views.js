// @flow weak
import {
    ENTER_LOGIN_VIEW,
    LEAVE_HOME_VIEW,
    ENTER_HOME_VIEW,
    LEAVE_LOGIN_VIEW,
    ENTER_PAGE_NOT_FOUND_VIEW,
    LEAVE_PAGE_NOT_FOUND_VIEW,
    ENTER_PROTECTED_VIEW,
    LEAVE_PROTECTED_VIEW,
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
    ENTER_POINT_EXCHANGE_HISTORY_VIEW,
    LEAVE_POINT_EXCHANGE_HISTORY_VIEW,
    ENTER_POINT_VIEW,
    LEAVE_POINT_VIEW,
    ENTER_WIN_HISTORY_VIEW,
    LEAVE_WIN_HISTORY_VIEW,
    ENTER_CHANCE_BUY_HISTORY_VIEW,
    LEAVE_CHANCE_BUY_HISTORY_VIEW,
    ENTER_EDIT_PROFILE_VIEW,
    LEAVE_EDIT_PROFILE_VIEW
} from '../constants/viewTypes';

const initialState = {
  currentView:  'home',
  enterTime:    null,
  leaveTime:    null
};

export default function views(state: Object = initialState, action: Object) {
  switch (action.type) {
    case ENTER_CHANCE_BUY_HISTORY_VIEW:
    case ENTER_PAGE_BAD_REQUEST_VIEW:
    case ENTER_PAGE_NOT_FOUND_VIEW:
    case ENTER_PROTECTED_VIEW:
    case ENTER_HOME_VIEW:
    case ENTER_HELP_VIEW:
    case ENTER_POLICY_VIEW:
    case ENTER_TERMS_VIEW:
    case ENTER_ADD_NEW_ADDRESS_VIEW:
    case ENTER_ADDRESS_VIEW:
    case ENTER_COIN_VIEW:
    case ENTER_CONTACT_VIEW:
    case ENTER_FRIEND_VIEW:
    case ENTER_POINT_EXCHANGE_HISTORY_VIEW:
    case ENTER_POINT_VIEW:
    case ENTER_WIN_HISTORY_VIEW:
    case ENTER_EDIT_PROFILE_VIEW:
    case ENTER_LOGIN_VIEW:
      // can't enter if you are already inside
      if (state.currentView !== action.currentView) {
        return {
          ...state,
          currentView:  action.currentView,
          enterTime:    action.enterTime,
          leaveTime:    action.leaveTime
        };
      }
      return state;
    case LEAVE_CHANCE_BUY_HISTORY_VIEW:
    case LEAVE_PAGE_BAD_REQUEST_VIEW:
    case LEAVE_PROTECTED_VIEW:
    case LEAVE_PAGE_NOT_FOUND_VIEW:
    case LEAVE_HOME_VIEW:
    case LEAVE_HELP_VIEW:
    case LEAVE_POLICY_VIEW:
    case LEAVE_TERMS_VIEW:
    case LEAVE_ADD_NEW_ADDRESS_VIEW:
    case LEAVE_ADDRESS_VIEW:
    case LEAVE_COIN_VIEW:
    case LEAVE_CONTACT_VIEW:
    case LEAVE_FRIEND_VIEW:
    case LEAVE_POINT_EXCHANGE_HISTORY_VIEW:
    case LEAVE_POINT_VIEW:
    case LEAVE_WIN_HISTORY_VIEW:
    case LEAVE_EDIT_PROFILE_VIEW:
    case LEAVE_LOGIN_VIEW:
      // can't leave if you aren't already inside
      if (state.currentView === action.currentView) {
        return {
          ...state,
          currentView:  action.currentView,
          enterTime:    action.enterTime,
          leaveTime:    action.leaveTime
        };
      }
      return state;

    default:
      return state;
  }
}
