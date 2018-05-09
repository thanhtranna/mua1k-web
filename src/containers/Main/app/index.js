// @flow weak

import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router';
import * as viewsActions from '../../../actions/viewAction';
import * as userAuthActions from '../../../actions/userAuthAction';
import * as auctionActions from '../../../actions/auctionActions';
import * as errorActions from '../../../actions/errorActions';
import App from './App';

const mapStateToProps = state => {
  return {
    // views:
    currentView: state.views.currentView,

    // auth
    isAuthenticated: state.userAuth.isAuthenticated,

    // user infor
    id: state.userAuth.id,
    uid: state.userAuth.uid,
    coin: state.userAuth.coin,
    point: state.userAuth.point,
    email: state.userAuth.email,
    isCheckin: state.userAuth.isCheckin,
    nickname: state.userAuth.nickname,
    valueCheckin: state.userAuth.valueCheckin,
    avatar: state.userAuth.avatar,

    // auctions
    act: state.auction.act,
    pageNumberAuction: state.auction.pageNumberAuction,
    filterTypeAuction: state.auction.filterTypeAuction,
    filterName: state.auction.filterName,
    keyword: state.auction.keyword
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        // views:
        ...viewsActions,
        // auth:
        ...userAuthActions,
        // auction
        ...auctionActions,
        // error:
        ...errorActions
      },
      dispatch
    )
  };
};

// we use here compose (from redux) just for conveniance (since compose(f,h, g)(args) looks better than f(g(h(args))))
export default compose(
  withRouter, // IMPORTANT: witRouter is "needed here" to avoid blocking routing:
  connect(mapStateToProps, mapDispatchToProps)
)(App);
