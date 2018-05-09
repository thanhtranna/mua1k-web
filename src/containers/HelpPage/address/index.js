// @flow weak

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as viewsActions from '../../../actions/viewAction';
import * as userAuthActions from '../../../actions/userAuthAction';
import * as addressActions from '../../../actions/addressActions';
import Address from './Address';

const mapStateToProps = state => {
  return {
    // containers:
    currentView: state.views.currentView,

    // userAuth
    token: state.userAuth.token,

    // address
    isFetching: state.address.isFetching,
    address: state.address.address
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      // containers:
      ...viewsActions,
      // userAuth:
      ...userAuthActions,
      // auction
      ...addressActions
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Address);
