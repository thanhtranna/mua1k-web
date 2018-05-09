// @flow weak
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {I18n} from 'react-i18next';
import {
  AnimatedView,
  AuctionCard,
  LeftAuctionCard,
  CategoryCard,
  CampaignCard,
  OwlCarousel
} from '../../components';
import {optionsBanner as options} from '../../constants/common';
import {optionsCategory} from '../../constants/common';
import {listenWinner, listenSoldOut} from '../../services/api';

// #region flow types
type
Props = any;
type
State = any;
// #endregion

class PageHome extends PureComponent < Props,
State > {
  constructor(props) {
    super(props);

    this.onAuctionFinishLoadMore = this
      .onAuctionFinishLoadMore
      .bind(this);
    this.handleLoadMore = this
      .handleLoadMore
      .bind(this);
    this.handleFilter = this
      .handleFilter
      .bind(this);
    this.reloadLeftAuctions = this
      .reloadLeftAuctions
      .bind(this);

    listenWinner(() => this.reloadLeftAuctions());
    listenSoldOut(() => this.reloadLeftAuctions());
  }

  static propTypes = {
    actions: PropTypes.shape({
      enterHome: PropTypes.func.isRequired,
      leaveHome: PropTypes.func.isRequired,
      getCategoriesIfNeeded: PropTypes.func.isRequired,
      getAuctionsIfNeeded: PropTypes.func.isRequired,
      getCampaignsIfNeeded: PropTypes.func.isRequired,
      loadMore: PropTypes.func.isRequired,
      resetAuctionStates: PropTypes.func.isRequired,
      filterAuctions: PropTypes.func.filterAuctions,
      getAuctionsFinishedIfNeeded: PropTypes.func.isRequired,
      getAuctionsIfNeededByCategory: PropTypes.func.isRequired,
      searchAuctionByKeyword: PropTypes.func.isRequired,
      updateKeyword: PropTypes.func.isRequired
    }),
    errorStatus: PropTypes.number,
    categories: PropTypes.array.isRequired,
    campaigns: PropTypes.array.isRequired,
    auctionsFinished: PropTypes.array.isRequired,
    pageAuctionsFinished: PropTypes.number.isRequired,
    auctions: PropTypes.array.isRequired,
    pageNumberAuction: PropTypes.number.isRequired,
    isFetchingAuction: PropTypes.bool.isRequired,
    isFetchingAuctionsFinish: PropTypes.bool.isRequired,
    isAuctionsGetByCategory: PropTypes.bool,
    categoryId: PropTypes.string,
    categoryName: PropTypes.string,
    isAuctionsGetByKeyword: PropTypes.bool,
    keyword: PropTypes.string
  };

  handleLoadMore(e) {
    e.preventDefault();
    const {actions: {
        loadMore
      }, pageNumberAuction} = this.props;
    loadMore(pageNumberAuction);
  }

  handleFilter(e) {
    e.preventDefault();
    const {
      actions: {
        getAuctionsIfNeeded,
        getAuctionsIfNeededByCategory,
        searchAuctionByKeyword
      },
      categoryId,
      categoryName,
      keyword,
      pageNumberAuction,
      isAuctionsGetByCategory,
      isAuctionsGetByKeyword
    } = this.props;

    let filter = {
      type: parseInt(e.target.dataset.type, 10),
      name: e.target.innerText
    }
    if (isAuctionsGetByCategory) {
      getAuctionsIfNeededByCategory(categoryId, categoryName, pageNumberAuction, filter);
    } else if (isAuctionsGetByKeyword) {
      searchAuctionByKeyword(keyword, pageNumberAuction, filter);
    } else {
      getAuctionsIfNeeded(pageNumberAuction, filter);
    }
  }

  componentWillUpdate(nextProps) {
    const {
      actions: {
        getAuctionsIfNeeded,
        getAuctionsFinishedIfNeeded,
        getAuctionsIfNeededByCategory,
        searchAuctionByKeyword,
        filterAuctions
      },
      pageNumberAuction,
      filterTypeAuction,
      filterName,
      pageAuctionsFinished,
      isAuctionsGetByCategory,
      categoryId,
      categoryName,
      isAuctionsGetByKeyword,
      keyword,
      auctions
    } = nextProps;
    if (pageNumberAuction !== this.props.pageNumberAuction) {
      let filter = {
        type: filterTypeAuction,
        name: filterName
      }
      if (isAuctionsGetByCategory) {
        getAuctionsIfNeededByCategory(categoryId, categoryName, pageNumberAuction, filter);
      } else if (isAuctionsGetByKeyword) {
        searchAuctionByKeyword(keyword, pageNumberAuction, filter);
      } else {
        getAuctionsIfNeeded(pageNumberAuction, filter);
      }
    }

    if (filterTypeAuction !== this.props.filterTypeAuction) {
      filterAuctions(filterTypeAuction, filterName, auctions);
    }

    if (pageAuctionsFinished !== this.props.pageAuctionsFinished) {
      getAuctionsFinishedIfNeeded(pageAuctionsFinished);
    }
  }

  componentDidMount() {
    const {
      actions: {
        enterHome,
        getCategoriesIfNeeded,
        getAuctionsIfNeeded,
        getCampaignsIfNeeded,
        getAuctionsFinishedIfNeeded
      },
      pageNumberAuction,
      pageAuctionsFinished
    } = this.props;
    enterHome();
    getCategoriesIfNeeded();
    getAuctionsIfNeeded(pageNumberAuction);
    getCampaignsIfNeeded();
    getAuctionsFinishedIfNeeded(pageAuctionsFinished);
  }

  componentWillReceiveProps(nextProps) {
    const {history} = this.props;
    if (nextProps.errorStatus === 400 || nextProps.errorStatus === 500 || nextProps.errorStatus === 404) 
      history.push('/error');
    }
  
  componentWillUnmount() {
    const {
      actions: {
        leaveHome,
        resetAuctionStates
      }
    } = this.props;
    leaveHome();
    resetAuctionStates();
  }

  reloadLeftAuctions() {
    const {
      actions: {
        getAuctionsIfNeeded,
        getAuctionsFinishedIfNeeded
      },
      pageAuctionsFinished,
      pageNumberAuction,
      filter
    } = this.props;
    getAuctionsIfNeeded(pageNumberAuction, filter);
    getAuctionsFinishedIfNeeded(pageAuctionsFinished);
  }

  onAuctionFinishLoadMore(e : any) {
    e.preventDefault();
    const {actions: {
        auctionsFinishLoadMore
      }, pageAuctionsFinished} = this.props;
    auctionsFinishLoadMore(pageAuctionsFinished);
  }

  render() {
    const {
      categories,
      campaigns,
      auctionsFinished,
      pageAuctionsFinished,
      auctions,
      isFetchingAuction,
      isFetchingAuctionsFinish,
      pageNumberAuction,
      filterTypeAuction,
      filterName,
      actions: {
        getAuctionsIfNeededByCategory,
        resetAuctionStates
      }
    } = this.props;

    const filter = {
      type: filterTypeAuction,
      name: filterName
    }
    return (
      <I18n ns="translations">
        {(t, {i18n}) => (
          <AnimatedView>
            <div className='wrapper'>
              <div className="_banner">
                <div className="container">
                  <div id="banner-slide" className="owl-carousel banner-slide"/>
                  <OwlCarousel ref="banner" options={options}>
                    {
                      campaigns.map((campaign, key) => <CampaignCard campaign={campaign} key={key}/>)
                    }
                  </OwlCarousel>
                </div>
              </div>
              <div className="_content">
                <div className="container">
                  <section className="slider-category">
                    <div id="slider-category">
                      <OwlCarousel ref="category" options={optionsCategory}>
                        {
                          categories.map((cate, key) => <CategoryCard
                          category={cate}
                          key={key}
                          page={pageNumberAuction}
                          getAuctionsIfNeededByCategory={getAuctionsIfNeededByCategory}
                          resetAuctionStates={resetAuctionStates}
                          filter={filter}/>)
                        }
                      </OwlCarousel>
                    </div>
                  </section>
                  <div className="main_content">
                    <div className="row">
                      <div className="col-xs-12 col-sm-5 col-md-4 col-lg-4">
                        <div className="sidebar_left">
                          <div className="box_sidebar">
                            <h3 className="box_sidebar_title">
                              <img src="images/icons/spinner.png" alt="Quay số"/>
                              Quay số
                            </h3>
                            <div className="box_sidebar_content">
                              <ul className="list_product_sidebar">
                                {
                                  auctionsFinished.map((auct, key) => (<LeftAuctionCard auction={auct} trans={t} key={key}/>))
                                }
                              </ul>
                              <div className="text-center mgt-20">
                                {
                                  auctionsFinished.length % 10 === 0 && auctionsFinished.length >= pageAuctionsFinished * 10
                                  ? <Link
                                      to="#"
                                      className="btn_md btn_green"
                                      onClick={this.onAuctionFinishLoadMore}>{t('Load more')}</Link>
                                  : <div className="alert alert-warning">{t('No more product')}</div>
                                }
                              </div>
                              <div className="loading_spinner">
                                {isFetchingAuctionsFinish
                                  ? <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
                                  : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-7 col-md-8 col-lg-8">
                        <div className="content_right">
                          <div className="_title">
                            <div className="pull-right">
                              <div className="dropdown">
                                <button className="btn dropdown-toggle" type="button" data-toggle="dropdown">{filterName}
                                  <span>
                                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                                  </span>
                                </button>
                                <ul className="dropdown-menu">
                                  <li>
                                    <Link to="/" data-type="1" onClick={this.handleFilter}>Yêu thích</Link>
                                  </li>
                                  <li>
                                    <Link to="/" data-type="2" onClick={this.handleFilter}>Sắp hết hạng</Link>
                                  </li>
                                  <li>
                                    <Link to="/" data-type="3" onClick={this.handleFilter}>Mới nhất</Link>
                                  </li>
                                  <li>
                                    <Link to="/" data-type="4" onClick={this.handleFilter}>Giá cao</Link>
                                  </li>
                                  <li>
                                    <Link to="/" data-type="5" onClick={this.handleFilter}>Giá thấp</Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="content_inner">
                            <div className="list_product_main">
                              <div className="row">
                                {
                                  auctions.map((auc, key) => (
                                  <div className="item" key={key}>
                                    <AuctionCard
                                      title={auc && auc.product && auc.product.name}
                                      image={auc && auc.product && auc.product.featureImage.thumb}
                                      numberTotal={auc && auc.product && auc.product.chanceNumber}
                                      numberSoldOut={auc && auc.totalSold}/>
                                  </div>
                                  ))
                                }
                              </div>
                            </div>
                            <div className="text-center mgt-20">
                              {
                                auctions.length % 10 === 0 && auctions.length >= pageNumberAuction * 10
                                ? <Link to="#" className="btn_md btn_green" onClick={this.handleLoadMore}>Tải Thêm</Link>
                                : <div className="alert alert-warning">{t('No more product')}</div>
                              }
                            </div>
                            <div className="loading_spinner">
                              {
                                isFetchingAuction
                                ? <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
                                : null
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedView>
        )
        }
      </I18n>
    );
  }
}

export default PageHome;
