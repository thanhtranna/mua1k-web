// @flow weak

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as viewsActions from '../../../actions/viewAction';
import * as contactActions from '../../../actions/contactActions';
import Contact from './Contact';
import * as errorActions from '../../../actions/errorActions';

const mapStateToProps = state => {
  return {
    // containers:
    currentView: state.views.currentView,

    // contact
    isFetching: state.contact.isFetching,
    isSending: state.contact.isSending,
    isError: state.contact.isError,
    messasge: state.contact.messasge,
    contactCategories: state.contact.contactCategories,

    // redux form
    syncValidation: state.form.syncValidation
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      // containers:
      ...viewsActions,
      // contact
      ...contactActions,
      // error:
      ...errorActions
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
