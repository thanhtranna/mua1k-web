// @flow strong #region imports
import React, {PureComponent} from 'react';
import {I18n} from 'react-i18next';
import PropTypes from 'prop-types';
// #endregion

export default class Friend extends PureComponent < Props,
State > {
  // #region propTypes
  static propTypes = {
    // containers props:
    enterFriend: PropTypes.func.isRequired,
    leaveFriend: PropTypes.func.isRequired
  };
  // #endregion

  componentDidMount() {
    this
      .props
      .enterFriend();
  }

  componentWillUnmount() {
    this
      .props
      .leaveFriend();
  }

  render() {
    return (
      <I18n ns="translations">
        {(t, {i18n}) => (
          <div className="content_right">
            <div className="friend-content">
              <div className="friend-inner">
                <div className="friend-tab">
                  <ul className="nav nav-tabs nav-justified">
                    <li className="active">
                      <a data-toggle="tab" href="#friend-tab-explain">
                        説明
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#friend-tab-ratings">
                        ランキング
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#friend-tab-bestfriend">
                        大親友 1
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#friend-tab-goodfriend">
                        親友 0
                      </a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#friend-tab-friend">
                        友達 0
                      </a>
                    </li>
                  </ul>

                  <div
                    className="tab-content friend-tab-content"
                    style={{
                    minHeight: '1025px'
                  }}>
                    <div id="friend-tab-explain" className="tab-pane fade in active">
                      <div className="friend-explain">
                        <div className="friend-explain-title">
                          <h3>招待合計: 1</h3>
                        </div>
                        <div className="friend-explain-content">
                          <div className="friend-qr-code">
                            <img src="images/qr_code.png" alt=""/>
                          </div>
                          <div className="friend-explain-inner">
                            <div className="mgb-20">
                              <p className="textblack">
                                ディック・ダービン上院議員（イリノイ州選出、民主党）は、トランプ氏が上
                              </p>
                              <p className="textgray">
                                種差別的な」表現を何度も繰り返したと公言している。11日の会合は、に到着<span className="textred">
                                  500した不...
                                </span>
                              </p>
                            </div>
                            <div className="mgb-20">
                              <p className="textblack">
                                ディック・ダービン上院議員（イリノイ州選出、民主党）は、トランプ氏が上
                              </p>
                              <p className="textgray">
                                種差別的な」表現を何度も繰り返したと公言している。11日の会合は、に到着<span className="textred">
                                  500した不...
                                </span>
                              </p>
                            </div>
                            <div className="mgb-20">
                              <p className="textblack">
                                ディック・ダービン上院議員（イリノイ州選出、民主党）は、トランプ氏が上
                              </p>
                              <p className="textgray">
                                種差別的な」表現を何度も繰り返したと公言している。11日の会合は、に到着<span className="textred">
                                  500した不...
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="clearfix"/>
                        <div className="text-center mgt-20">
                          <a href="http://localhost:3006" className="btn btn-green-2 btn-square">
                            友達招待
                          </a>
                        </div>
                      </div>
                    </div>
                    <div id="friend-tab-ratings" className="tab-pane fade">
                      <div className="friend-table">
                        <div className="table-responsive">
                          <table className="table table-bordered table-hover mg0">
                            <thead>
                              <tr>
                                <th>STT</th>
                                <th>Mã số</th>
                                <th>Biệt danh</th>
                                <th>Số người giới thiệu</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>20092019</td>
                                <td>Hoai Thuong</td>
                                <td>79</td>
                              </tr>
                              <tr>
                                <td>1</td>
                                <td>20092019</td>
                                <td>Hoai Thuong</td>
                                <td>79</td>
                              </tr>
                              <tr>
                                <td>1</td>
                                <td>20092019</td>
                                <td>Hoai Thuong</td>
                                <td>79</td>
                              </tr>
                              <tr>
                                <td>1</td>
                                <td>20092019</td>
                                <td>Hoai Thuong</td>
                                <td>79</td>
                              </tr>
                              <tr>
                                <td>1</td>
                                <td>20092019</td>
                                <td>Hoai Thuong</td>
                                <td>79</td>
                              </tr>
                              <tr>
                                <td>1</td>
                                <td>20092019</td>
                                <td>Hoai Thuong</td>
                                <td>79</td>
                              </tr>
                              <tr>
                                <td>1</td>
                                <td>20092019</td>
                                <td>Hoai Thuong</td>
                                <td>79</td>
                              </tr>
                              <tr>
                                <td>1</td>
                                <td>20092019</td>
                                <td>Hoai Thuong</td>
                                <td>79</td>
                              </tr>
                              <tr>
                                <td>1</td>
                                <td>20092019</td>
                                <td>Hoai Thuong</td>
                                <td>79</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="clearfix text-center">
                          <ul className="pagination">
                            <li>
                              <a href="http://localhost:3006">«</a>
                            </li>
                            <li>
                              <a href="http://localhost:3006">1</a>
                            </li>
                            <li>
                              <a href="http://localhost:3006">2</a>
                            </li>
                            <li>
                              <a href="http://localhost:3006">3</a>
                            </li>
                            <li>
                              <a href="http://localhost:3006">4</a>
                            </li>
                            <li>
                              <a href="http://localhost:3006">5</a>
                            </li>
                            <li>
                              <a href="http://localhost:3006">»</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div id="friend-tab-bestfriend" className="tab-pane fade">
                      <div className="friend-table">
                        <div className="table-responsive">
                          <table className="table table-bordered table-hover mg0">
                            <thead>
                              <tr>
                                <th>ID</th>
                                <th>Biệt danh</th>
                                <th>Ngày tạo</th>
                                <th>Số người giới thiệu</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>10000</td>
                                <td>Hoai Thuong</td>
                                <td>2017-08-01</td>
                                <td>1</td>
                              </tr>
                              <tr>
                                <td>10000</td>
                                <td>Hoai Thuong</td>
                                <td>2017-08-01</td>
                                <td>1</td>
                              </tr>
                              <tr>
                                <td>10000</td>
                                <td>Hoai Thuong</td>
                                <td>2017-08-01</td>
                                <td>1</td>
                              </tr>
                              <tr>
                                <td>10000</td>
                                <td>Hoai Thuong</td>
                                <td>2017-08-01</td>
                                <td>1</td>
                              </tr>
                              <tr>
                                <td>10000</td>
                                <td>Hoai Thuong</td>
                                <td>2017-08-01</td>
                                <td>1</td>
                              </tr>
                              <tr>
                                <td>10000</td>
                                <td>Hoai Thuong</td>
                                <td>2017-08-01</td>
                                <td>1</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="clearfix text-center">
                          <ul className="pagination">
                            <li>
                              <a href="http://localhost:3006">«</a>
                            </li>
                            <li>
                              <a href="http://localhost:3006">1</a>
                            </li>
                            <li>
                              <a href="http://localhost:3006">2</a>
                            </li>
                            <li>
                              <a href="http://localhost:3006">3</a>
                            </li>
                            <li>
                              <a href="http://localhost:3006">4</a>
                            </li>
                            <li>
                              <a href="http://localhost:3006">5</a>
                            </li>
                            <li>
                              <a href="http://localhost:3006">»</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div id="friend-tab-goodfriend" className="tab-pane fade">
                      <div className="no-friend">
                        <p className="msg">新友」がまだいない</p>
                        <img src="images/no_friend.png" alt=""/>
                        <div className="clearfix">
                          <a href="http://localhost:3006" className="btn btn-green-2 btn-square">
                            友達招待
                          </a>
                        </div>
                      </div>
                    </div>
                    <div id="friend-tab-friend" className="tab-pane fade">
                      <div className="no-friend">
                        <p className="msg">新友」がまだいない</p>
                        <img src="images/no_friend.png" alt=""/>
                        <div className="clearfix">
                          <a href="http://localhost:3006" className="btn btn-green-2 btn-square">
                            友達招待
                          </a>
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
}
