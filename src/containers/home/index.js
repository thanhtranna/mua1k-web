// @flow weak
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as viewActions from '../../actions/viewAction';
import * as categoryActions from '../../actions/categoryActions';
import * as campaignActions from '../../actions/campaignActions';
import * as auctionActions from '../../actions/auctionActions';
import PageHome from './home';

const mapStateToProps = state => {
  return {
    // view
    currentView: state.views.currentView,

    // categories
    categories: state.category.categories,

    // auctions
    auctions: state.auction.auctions,
    act: state.auction.act,
    pageNumberAuction: state.auction.pageNumberAuction,
    filterTypeAuction: state.auction.filterTypeAuction,
    filterName: state.auction.filterName,
    isFetchingAuction: state.auction.isFetching,
    isAuctionsGetByCategory: state.auction.isAuctionsGetByCategory,
    categoryId: state.auction.categoryId,
    categoryName: state.auction.categoryName,
    isAuctionsGetByKeyword: state.auction.isAuctionsGetByKeyword,
    keyword: state.auction.keyword,

    //auctions finished
    auctionsFinished: state.auction.auctionsFinished,
    pageAuctionsFinished: state.auction.pageAuctionsFinished,
    isFetchingAuctionsFinish: state.auction.isFetchingAuctionsFinish,

    // campaigns
    campaigns: state.campaign.campaigns,

    // error
    errorStatus: state.error.errorStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        //  containers
        ...viewActions,
        // category
        ...categoryActions,
        // auction
        ...auctionActions,
        // campaign
        ...campaignActions
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageHome);
