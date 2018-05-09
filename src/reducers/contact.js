// @flow weak
import {
  REQUEST_LIST_CONTACT_CATEGORIES,
  RECEIVED_LIST_CONTACT_CATEGORIES,
  ERROR_LIST_CONTACT_CATEGORIES,
  REQUEST_SEND_CONTACT,
  RECEIVED_SEND_CONTACT,
  ERROR_SEND_CONTACT,
  RESET_CONTACT_STATES,
} from "../constants/contactType";
import moment from "moment/moment";

const initialState = {
  contactCategories: [],
  isFetching: false,
  isSending: false,
  isError: false,
  message: '',
};

const currentTime = moment().format();

export default function (
  state = initialState,
  action
) {
  switch (action.type) {
    case REQUEST_LIST_CONTACT_CATEGORIES:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        isFetching: action && action.isFetching ? action && action.isFetching : initialState.isFetching
      };

    case RECEIVED_LIST_CONTACT_CATEGORIES:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        isFetching: action && action.isFetching ? action && action.isFetching : initialState.isFetching,
        contactCategories: action && action.contactCategories && action.contactCategories.data ? action && action.contactCategories && action.contactCategories.data : initialState.contactCategories
      };

    case ERROR_LIST_CONTACT_CATEGORIES:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        isFetching: action && action.isFetching ? action && action.isFetching : initialState.isFetching
      };
    case REQUEST_SEND_CONTACT:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        isSending: action && action.isSending ? action && action.isSending : initialState.isSending
      };
    case RECEIVED_SEND_CONTACT:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        isSending: action && action.isSending ? action && action.isSending : initialState.isSending,
        isError: false,
        messasge: 'Send contact successfull. We will reply to your mail soon!',
      };
    case ERROR_SEND_CONTACT:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        isSending: action && action.isSending ? action && action.isSending : initialState.isSending,
        isError: true,
        messasge: action.msg,
      };
    case RESET_CONTACT_STATES:
      return {
        ...state,
        actionTime: action && action.time ? action && action.time : currentTime,
        contactCategories: initialState.contactCategories,
        isFetching: initialState.isFetching,
        isSending: initialState.isSending,
        isError: initialState.isError,
        messasge: initialState.messasge,
      };
    default:
      return { ...state
      };
  }
}