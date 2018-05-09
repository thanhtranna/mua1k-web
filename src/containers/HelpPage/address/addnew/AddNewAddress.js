// @flow strong

// #region imports
import React, { PureComponent } from 'react';
import { I18n } from 'react-i18next';
import PropTypes from 'prop-types';
// #endregion

export default class AddNewAddress extends PureComponent<Props, State> {
  // #region propTypes
  static propTypes = {
    // containers props:
    enterAddNewAddress: PropTypes.func.isRequired,
    leaveAddNewAddress: PropTypes.func.isRequired
  };
  // #endregion

  componentDidMount() {
    this.props.enterAddNewAddress();
  }

  componentWillUnmount() {
    this.props.leaveAddNewAddress();
  }

  render() {
    return (
      <I18n ns="translations">
        {(t, { i18n }) => (
          <div className="help-content">
            <div>
              <div className="text-center">
                <h3 className="mgt-20">アドレス帳</h3>
              </div>
              <div className="mgt-20">
                <div className="add-address-book">
                  <form>
                    <div className="row">
                      <div className="col-xs-12 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label className="control-label" htmlFor="name">
                            氏名
                          </label>
                          <input
                            type="text"
                            required=""
                            className="form-control"
                            id="name"
                          />
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label className="control-label" htmlFor="phone">
                            携帯電話
                          </label>
                          <input
                            type="text"
                            required=""
                            className="form-control"
                            id="phone"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label
                            className="control-label"
                            htmlFor="postal_code"
                          >
                            郵便番号
                          </label>
                          <input
                            type="text"
                            required=""
                            className="form-control"
                            id="postal_code"
                          />
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label
                            className="control-label"
                            htmlFor="prefectures"
                          >
                            都道府県
                          </label>
                          <input
                            type="text"
                            required=""
                            className="form-control"
                            id="prefectures"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label
                            className="control-label"
                            htmlFor="municipality"
                          >
                            町村
                          </label>
                          <input
                            type="text"
                            required=""
                            className="form-control"
                            id="municipality"
                          />
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label
                            className="control-label"
                            htmlFor="building_name"
                          >
                            番地・建物名等
                          </label>
                          <input
                            type="text"
                            required=""
                            className="form-control"
                            id="building_name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label className="control-label" htmlFor="remarks">
                            備考
                          </label>
                          <input
                            type="text"
                            required=""
                            className="form-control"
                            id="remarks"
                          />
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label className="control-label">
                            デフォルトにする
                          </label>
                          <div className="checkbox-content">
                            <input
                              type="checkbox"
                              className="ios8-switch ios8-switch-lg"
                              id="make-default"
                            />
                            <label htmlFor="make-default" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mgt-20">
                      <button
                        type="submit"
                        className="btn btn-green-1 btn-square"
                      >
                        保存
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </I18n>
    );
  }
  // #endregion
}
