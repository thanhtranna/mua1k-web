// @flow weak

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { I18n } from 'react-i18next';
import $ from 'jquery';
import {activeRoute} from "../../helpers";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      const {
        history,
      } = this.props;
      if(history.location.pathname !== '/') {
        history.push('/');
      }
      else {
        this.props.resetAuctionStates('search');
      }
    }
  }

  handleInputChange(e) {
    let keyword = e.target.value;
    this.props.updateKeyword(keyword);
  }

  handleSearch(e) {
    const {
      history,
    } = this.props;
    if(history.location.pathname !== '/') {
      history.push('/');
    }
    else {
      this.props.resetAuctionStates('search');
    }
  }

  toggleMenu() {
      $('#sidebar_mobile').toggleClass('active');
      $('#sidebar_mobile .backdrop').toggleClass('active');
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

      } else {
          $('.content_right').css('min-height', $('.sidebar_left').height());
      }
  }

  componentWillUpdate(nextProps) {
      const {
        keyword,
        pageNumberAuction,
      } = this.props;
      const { act } = nextProps;
      if(act !== this.props.act && act === 'search') {
        this.props.searchAuctionByKeyword(keyword, pageNumberAuction);
      }
  }

  render() {
      const {
        isAuthenticated,
        notify,
        username,
        image,
        onClick,
        history,
        coin,
        point,
        uid
      } = this.props;
      return (
      <I18n ns="translations">
          {
              (t, {i18n}) => (
                  <header>
                          <nav className="navbar _navbar navbar-fixed-top">
                              <div className="container-fluid">
                                  <div className="navbar-header">
                                      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                          <span className="sr-only">Toggle navigation</span>
                                          <span className="icon-bar"></span>
                                          <span className="icon-bar"></span>
                                          <span className="icon-bar"></span>
                                      </button>
                                      <Link className="navbar-brand" to="/">
                                          <img src="/images/logo.png" alt="mua1k.com"/>
                                      </Link>
                                  </div>
                                  <div className="visible-xs menu-mb">
                                      <div className="menu-top">
                                          <ul>
                                              {!isAuthenticated ?
                                              <li className="dropdown">
                                                  <p className="area-login-register">
                                                      <Link to={'/login'} className="login-text"> {t("Login")}</Link> |
                                                      <Link to={'/register'} className="register-text"> {t("Register")}</Link>
                                                  </p>
                                              </li> : null }
                                              <li className="cart">
                                                  <Link to="/"><i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                                  </Link>
                                                  <span className="number">{notify}</span>
                                              </li>
                                              {isAuthenticated ?
                                              <li>
                                                  <div className="btn-menu-mb" id="btn-menu-mb">
                                                      <a onClick={this.toggleMenu}>
                                                          <span></span>
                                                          <span></span>
                                                          <span></span>
                                                      </a>
                                                  </div>
                                              </li> : null }
                                          </ul>
                                          <div className="sidebar-mb" id="sidebar_mobile">
                                              <div className="sidebar-content">
                                                  <div className="box_sidebar">
                                                      <h3 className="box_sidebar_title">{t('title_menu')}</h3>
                                                      <div className="box_sidebar_body">
                                                          <div className="user_box">
                                                              <Link to="/help/edit_profile" className="edit_profile">
                                                                  <i className="fa fa-pencil" aria-hidden="true"></i>
                                                              </Link>
                                                              <div className="user_box_avatar">
                                                                  <img src={image} alt={username} title={username} />
                                                              </div>
                                                              <div className="user_box_content">
                                                                  <h4 className="ubc_name">{username}</h4>
                                                                  <p>{t('coin')} :    <b>{coin}コイン</b>
                                                                  </p><p>{t('point')}:     <b>{point}</b>
                                                              </p><p>{t('uid')} :    <b>{uid}</b>
                                                              </p><div className="ubc_dh">
                                                                  <Link to="/" className="btn-md btn-white"><img src="/images/icons/award.png" alt="" /> ポイント</Link>
                                                                  <Link to="/" className="btn-md btn-green">交換</Link>
                                                              </div>
                                                              </div>
                                                          </div>
                                                          <div className="menu_sidebar">
                                                              <div className="menu_sidebar_inner">
                                                                  <ul>
                                                                      <li>
                                                                          <Link to="#" className="show-child-menu">
                                                                              <img src="/images/icons/ic_notification.png" alt=""/>
                                                                              <img className="img_hover" src="images/icons/ic_notification_w.png" alt=""/>
                                                                              {t('menu_invite_friend')}
                                                                              <i className="show-child-menu-btn fa fa-angle-down"></i>
                                                                          </Link>
                                                                          <ul className="child-menu active">
                                                                              <li>
                                                                                  <Link to={`/help/friend`} className={activeRoute('/help/friend', history.location.pathname)}>
                                                                                      {t('menu_friend')} <i className="fa fa-angle-right"></i>
                                                                                  </Link>
                                                                              </li>
                                                                              <li>
                                                                                  <Link to={`/help/point`} className={activeRoute('/help/point', history.location.pathname)}>
                                                                                      {t('menu_received_point')} <i className="fa fa-angle-right"></i>
                                                                                  </Link>
                                                                              </li>
                                                                              <li>
                                                                                  <Link to={`/help/coin`} className={activeRoute('/help/coin', history.location.pathname)}>
                                                                                      {t('menu_exchange_coin')} <i className="fa fa-angle-right"></i>
                                                                                  </Link>
                                                                              </li>
                                                                          </ul>
                                                                      </li>
                                                                      <li>
                                                                          <Link to={`/help`} className={activeRoute('/help', history.location.pathname)}>
                                                                              <img src="/images/icons/ic_question.png" alt=""/>
                                                                              <img className="img_hover" src="images/icons/ic_question_w.png" alt=""/>
                                                                              {t('menu_help')}
                                                                          </Link>
                                                                      </li>
                                                                      <li>
                                                                          <Link to="/">
                                                                              <img src="/images/icons/ic_tag.png" alt=""/>
                                                                              <img className="img_hover" src="images/icons/ic_tag_w.png" alt=""/>
                                                                              {t('menu_tick_coin')}
                                                                          </Link>
                                                                      </li>
                                                                      <li>
                                                                          <Link to={`/help/address`} className={activeRoute('/help/address', history.location.pathname)}>
                                                                              <img src="/images/icons/ic_address.png" alt=""/>
                                                                              <img className="img_hover" src="images/icons/ic_address_w.png" alt=""/>
                                                                              {t('menu_address')}
                                                                          </Link>
                                                                      </li>
                                                                      <li>
                                                                          <Link to={`/help/coin_exchange_history`} className={activeRoute('/help/coin_exchange_history', history.location.pathname)}>
                                                                              <img src="/images/icons/ic_history.png" alt=""/>
                                                                              <img className="img_hover" src="images/icons/ic_history_w.png" alt=""/>
                                                                              {t('menu_history_transaction')}
                                                                          </Link>
                                                                      </li>
                                                                      <li>
                                                                          <Link to="/">
                                                                              <img src="/images/icons/ic_chat.png" alt=""/>
                                                                              <img className="img_hover" src="images/icons/ic_chat_w.png" alt=""/>
                                                                              {t('menu_review_persional')}
                                                                          </Link>
                                                                      </li>
                                                                      <li>
                                                                          <Link to="/help/winner_history" className={activeRoute('/help/winner_history', history.location.pathname)}>
                                                                              <img src="/images/icons/ic_cup.png" alt=""/>
                                                                              <img className="img_hover" src="images/icons/ic_cup_w.png" alt=""/>
                                                                              {t('menu_history_winner')}
                                                                          </Link>
                                                                      </li>
                                                                      <li>
                                                                          <Link to="/help/chance_buy_history" className={activeRoute('/help/chance_buy_history', history.location.pathname)}>
                                                                              <img src="/images/icons/ic_category.png" alt=""/>
                                                                              <img className="img_hover" src="images/icons/ic_category_w.png" alt=""/>
                                                                              {t('menu_history_buy')}
                                                                          </Link>
                                                                      </li>
                                                                      <li>
                                                                          <Link to="/">
                                                                              <img src="/images/icons/ic_like.png" alt=""/>
                                                                              <img className="img_hover" src="images/icons/ic_like_w.png" alt=""/>
                                                                              {t('menu_favorite')}
                                                                          </Link>
                                                                      </li>
                                                                      <li>
                                                                          <Link to={`/help/contact`} className={activeRoute('/help/contact', history.location.pathname)}>
                                                                              <img src="/images/icons/ic_msg.png" alt=""/>
                                                                              <img className="img_hover" src="images/icons/ic_msg_w.png" alt=""/>
                                                                              {t('menu_policy')}
                                                                          </Link>
                                                                      </li>
                                                                      <li>
                                                                          <Link to={`/help/policy`} className={activeRoute('/help/policy', history.location.pathname)}>
                                                                              <img src="/images/icons/ic_category_check.png" alt=""/>
                                                                              <img className="img_hover" src="images/icons/ic_category_check_w.png" alt=""/>
                                                                              {t('menu_policy')}
                                                                          </Link>
                                                                      </li>
                                                                      <li>
                                                                          <Link to={`/help/terms`} className={activeRoute('/help/terms', history.location.pathname)}>
                                                                              <img src="/images/icons/ic_list.png" alt=""/>
                                                                              <img className="img_hover" src="images/icons/ic_list_w.png" alt=""/>
                                                                              {t('menu_terms')}
                                                                          </Link>
                                                                      </li>
                                                                  </ul>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="backdrop"></div>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                      <form className="navbar-form navbar-left">
                                          <div className="input-group header_search">
                                              <input type="text" className="form-control"
                                                     placeholder={t("placeholder_search")} onChange={this.handleInputChange} onKeyPress={this.handleKeyPress}/>
                                              <span className="input-group-btn">
                                              <button className="btn btn-default" type="button" onClick={this.handleSearch}>
                                                  <i className="fa fa-search" aria-hidden="true"></i>
                                              </button>
                                          </span>
                                          </div>
                                      </form>
                                      <ul className="nav navbar-nav navbar-right">
                                          {isAuthenticated ?
                                              <li className="dropdown" style={{'marginTop': '12px'}}>
                                                  <Link to="#" className="dropdown-toggle" data-toggle="dropdown"
                                                        role="button" aria-haspopup="true" aria-expanded="false">
                                                      <img src={image} alt=""/> {username}
                                                      <span className="caret"></span>
                                                  </Link>
                                                  <ul className="dropdown-menu"
                                                      style={{'marginTop': '8px'}}>
                                                      <li><Link to="/help"> {t("Profile")}</Link></li>
                                                      <li><a onClick={onClick}
                                                             style={{'cursor': 'pointer'}}> {t("Logout")}</a></li>
                                                  </ul>
                                              </li>
                                              :
                                              <li className="dropdown">
                                                  <p className="area-login-register">
                                                      <Link to={'/login'} className="login-text"> {t("Login")}</Link> |
                                                      <Link to={'/register'} className="register-text"> {t("Register")}</Link>
                                                  </p>
                                              </li>
                                          }
                                          <li className="cart">
                                              <Link to="/"><i className="fa fa-shopping-cart" aria-hidden="true"></i> {t("Cart")}</Link>
                                              <span className="number"> {notify}</span>
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                          </nav>
                      </header>
              )
          }
      </I18n>
    );
  }
}


Header.propTypes = {
    isAuthenticated: PropTypes.bool,
    notify: PropTypes.number,
    username: PropTypes.string,
    image: PropTypes.string,
    onClick: PropTypes.func,
    // poin: PropTypes.number,
    // coin: PropTypes.number,
    // uid: PropTypes.number
};

Header.defaultProps = {
    isAuthenticated: false,
    notify: 0,
    username: 'username',
    image: '/images/avatar.jpg',
    poin: 0,
    coin: 0,
    uid: 0
};
