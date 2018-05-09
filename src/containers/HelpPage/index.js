// @flow weak

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as viewsActions from '../../actions/viewAction';
import * as userAuthActions from '../../actions/userAuthAction';
import * as auctionActions from '../../actions/auctionActions';
import HelpPage from './HelpPage';

const mapStateToProps = state => {
  return {
    // containers:
    currentView: state.views.currentView,

    // userAuth:
    isAuthenticated: state.userAuth.isAuthenticated,
    isEditting: state.userAuth.isEditting,
    token: state.userAuth.token,
    nickname: state.userAuth.nickname,
    avatar: state.userAuth.avatar,
    uid: state.userAuth.uid,
    coin: state.userAuth.coin,
    point: state.userAuth.point,
    reloadData: state.exchangeCoin.reloadData
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
      ...auctionActions
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HelpPage);
