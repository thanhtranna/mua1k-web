// @flow strong

// #region imports
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { I18n } from 'react-i18next';
import $ from 'jquery';
// import auth                  from '../../services/auth';

import { HelpPageRoutes } from '../../routes/HelpPageRoutes';
import { activeRoute } from '../../helpers';
// #endregion

// #region flow types
type Props = {
  // react-router 4:
  history: any,

  // userAuth:
  isAuthenticated: boolean,
  nickname: string,
  avatar: string,
  uid: number,
  coin: number,
  point: number
};

// #endregion

export default class Help extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.childMenu = this.childMenu.bind(this);
  }
  // #region propTypes
  static propTypes = {
    // react-router 4:
    history: PropTypes.object.isRequired,

    // userAuth:
    isAuthenticated: PropTypes.bool,
    nickname: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    uid: PropTypes.number.isRequired,
    coin: PropTypes.number.isRequired,
    point: PropTypes.number.isRequired,
    token: PropTypes.string.isRequired
  };
  // #endregion

  childMenu() {
    $('.show-child-menu').click(function() {
      $(this)
        .children('.show-child-menu-btn')
        .toggleClass('active');
      $(this)
        .parent()
        .children('ul')
        .toggleClass('active');
    });
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    if (!nextProps.isAuthenticated) history.push('/');
  }

  render() {
    const { uid, coin, point, nickname, avatar } = this.props;

    return (
      <I18n ns="translations">
        {(t, { i18n }) => (
          <div className="wrapper">
            <div className="_content page_content">
              <div className="container">
                <div className="main_content">
                  <div className="row">
                    <div className="col-xs-12 col-sm-5 col-md-4 col-lg-4">
                      <div className="sidebar_left">
                        <div className="box_sidebar">
                          <h3 className="box_sidebar_title">Account</h3>
                          <div className="box_sidebar_body">
                            <div className="user_box">
                              <Link
                                to={'/help/edit_profile'}
                                className="edit_profile"
                              >
                                <i
                                  className="fa fa-pencil"
                                  aria-hidden="true"
                                />
                              </Link>
                              <div className="user_box_avatar">
                                <img
                                  src={avatar}
                                  alt={nickname}
                                  title={nickname}
                                />
                              </div>
                              <div className="user_box_content">
                                <h4 className="ubc_name">{nickname}</h4>
                                <p>
                                  {t('balance')} :{' '}
                                  <b>{`${coin}${t('coin')}`}</b>
                                </p>
                                <p>
                                  {t('point')}: <b>{point}</b>
                                </p>
                                <p>
                                  {t('uid')} : <b>{uid}</b>
                                </p>
                                <div className="ubc_dh">
                                  <Link to="/" className="btn-md btn-white">
                                    <img src="/images/icons/award.png" alt="" />{' '}
                                    Point
                                  </Link>
                                  <Link to="/" className="btn-md btn-green">
                                    Exchange
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div className="menu_sidebar">
                              <div className="menu_sidebar_inner">
                                <ul>
                                  <li>
                                    <Link
                                      to="#"
                                      className="show-child-menu"
                                      onMouseEnter={this.childMenu}
                                      onMouseLeave={this.childMenu}
                                    >
                                      <img
                                        src="/images/icons/ic_notification.png"
                                        alt=""
                                      />
                                      <img
                                        className="img_hover"
                                        src="/images/icons/ic_notification_w.png"
                                        alt=""
                                      />
                                      {t('menu_invite_friend')}
                                      <i className="show-child-menu-btn fa fa-angle-down" />
                                    </Link>
                                    <ul className="child-menu">
                                      <li>
                                        <Link
                                          to={`/help/friend`}
                                          className={activeRoute(
                                            '/help/friend',
                                            this.props.location.pathname
                                          )}
                                        >
                                          {t('menu_friend')}{' '}
                                          <i className="fa fa-angle-right" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          to={`/help/point`}
                                          className={activeRoute(
                                            '/help/point',
                                            this.props.location.pathname
                                          )}
                                        >
                                          {t('menu_received_point')}{' '}
                                          <i className="fa fa-angle-right" />
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          to={`/help/coin`}
                                          className={activeRoute(
                                            '/help/coin',
                                            this.props.location.pathname
                                          )}
                                        >
                                          {t('menu_exchange_coin')}{' '}
                                          <i className="fa fa-angle-right" />
                                        </Link>
                                      </li>
                                    </ul>
                                  </li>
                                  <li>
                                    <Link
                                      to={`/help`}
                                      className={activeRoute(
                                        '/help',
                                        this.props.location.pathname
                                      )}
                                    >
                                      <img
                                        src="/images/icons/ic_question.png"
                                        alt=""
                                      />
                                      <img
                                        className="img_hover"
                                        src="/images/icons/ic_question_w.png"
                                        alt=""
                                      />
                                      {t('menu_help')}
                                    </Link>
                                  </li>
                                  <li>
                                    <Link to="/">
                                      <img
                                        src="/images/icons/ic_tag.png"
                                        alt=""
                                      />
                                      <img
                                        className="img_hover"
                                        src="/images/icons/ic_tag_w.png"
                                        alt=""
                                      />
                                      {t('menu_tick_coin')}
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to={`/help/address`}
                                      className={activeRoute(
                                        '/help/address',
                                        this.props.location.pathname
                                      )}
                                    >
                                      <img
                                        src="/images/icons/ic_address.png"
                                        alt=""
                                      />
                                      <img
                                        className="img_hover"
                                        src="/images/icons/ic_address_w.png"
                                        alt=""
                                      />
                                      {t('menu_address')}
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to={`/help/coin_exchange_history`}
                                      className={activeRoute(
                                        '/help/coin_exchange_history',
                                        this.props.location.pathname
                                      )}
                                    >
                                      <img
                                        src="/images/icons/ic_history.png"
                                        alt=""
                                      />
                                      <img
                                        className="img_hover"
                                        src="/images/icons/ic_history_w.png"
                                        alt=""
                                      />
                                      {t('menu_history_transaction')}
                                    </Link>
                                  </li>
                                  <li>
                                    <Link to="/">
                                      <img
                                        src="/images/icons/ic_chat.png"
                                        alt=""
                                      />
                                      <img
                                        className="img_hover"
                                        src="/images/icons/ic_chat_w.png"
                                        alt=""
                                      />
                                      {t('menu_review_persional')}
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="/help/winner_history"
                                      className={activeRoute(
                                        '/help/winner_history',
                                        this.props.location.pathname
                                      )}
                                    >
                                      <img
                                        src="/images/icons/ic_cup.png"
                                        alt=""
                                      />
                                      <img
                                        className="img_hover"
                                        src="/images/icons/ic_cup_w.png"
                                        alt=""
                                      />
                                      {t('menu_history_winner')}
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="/help/chance_buy_history"
                                      className={activeRoute(
                                        '/help/chance_buy_history',
                                        this.props.location.pathname
                                      )}
                                    >
                                      <img
                                        src="/images/icons/ic_category.png"
                                        alt=""
                                      />
                                      <img
                                        className="img_hover"
                                        src="/images/icons/ic_category_w.png"
                                        alt=""
                                      />
                                      {t('menu_history_buy')}
                                    </Link>
                                  </li>
                                  <li>
                                    <Link to="/">
                                      <img
                                        src="/images/icons/ic_like.png"
                                        alt=""
                                      />
                                      <img
                                        className="img_hover"
                                        src="/images/icons/ic_like_w.png"
                                        alt=""
                                      />
                                      {t('menu_favorite')}
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to={`/help/contact`}
                                      className={activeRoute(
                                        '/help/contact',
                                        this.props.location.pathname
                                      )}
                                    >
                                      <img
                                        src="/images/icons/ic_msg.png"
                                        alt=""
                                      />
                                      <img
                                        className="img_hover"
                                        src="/images/icons/ic_msg_w.png"
                                        alt=""
                                      />
                                      {t('menu_policy')}
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to={`/help/policy`}
                                      className={activeRoute(
                                        '/help/policy',
                                        this.props.location.pathname
                                      )}
                                    >
                                      <img
                                        src="/images/icons/ic_category_check.png"
                                        alt=""
                                      />
                                      <img
                                        className="img_hover"
                                        src="/images/icons/ic_category_check_w.png"
                                        alt=""
                                      />
                                      {t('menu_policy')}
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to={`/help/terms`}
                                      className={activeRoute(
                                        '/help/terms',
                                        this.props.location.pathname
                                      )}
                                    >
                                      <img
                                        src="/images/icons/ic_list.png"
                                        alt=""
                                      />
                                      <img
                                        className="img_hover"
                                        src="/images/icons/ic_list_w.png"
                                        alt=""
                                      />
                                      {t('menu_terms')}
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-7 col-md-8 col-lg-8">
                      <div className="content_right">
                        <div className="content_right_inner">
                          <HelpPageRoutes />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </I18n>
    );
  }
  // #endregion

  // #region on go back home button click callback
  goHome = (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
    }
    const { history } = this.props;
    history.push({ pathname: '/' });
  };
  // #endregion
}
