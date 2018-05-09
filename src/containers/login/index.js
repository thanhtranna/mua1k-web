// @flow weak

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as viewsActions from '../../actions/viewAction';
import * as userAuthActions from '../../actions/userAuthAction';
import Login from './Login';
import * as errorActions from '../../actions/errorActions';

const mapStateToProps = state => {
  return {
    // containers:
    currentView: state.views.currentView,

    // useAuth:
    isAuthenticated: state.userAuth.isAuthenticated,
    isError: state.userAuth.isError,
    errorMessage: state.userAuth.errorMessage,
    isFetching: state.userAuth.isFetching,
    isLogging: state.userAuth.isLogging,

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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
