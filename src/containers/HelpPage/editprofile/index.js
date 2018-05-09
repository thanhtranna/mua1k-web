// @flow weak

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as viewsActions from '../../../actions/viewAction';
import * as userAuthActions from '../../../actions/userAuthAction';
import * as errorActions from '../../../actions/errorActions';
import EditProfile from './EditProfile';

const mapStateToProps = state => {
  return {
    // containers:
    currentView: state.views.currentView,

    // userAuth:
    isEditting: state.userAuth.isEditting,
    isError: state.userAuth.isError,
    errorMessage: state.userAuth.errorMessage,
    token: state.userAuth.token,
    nickname: state.userAuth.nickname,
    avatar: state.userAuth.avatar,

    // redux form
    syncValidation: state.form.syncValidation
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      // containers:
      ...viewsActions,
      // userAuth:
      ...userAuthActions,
      // error:
      ...errorActions
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
