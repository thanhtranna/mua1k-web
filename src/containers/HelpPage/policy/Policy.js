// @flow strong

// #region imports
import React, { PureComponent } from 'react';
import { I18n } from 'react-i18next';
import IFrame from 'react-iframe';
import PropTypes from 'prop-types';
// #endregion

export default class Policy extends PureComponent<Props, State> {
  // #region propTypes
  static propTypes = {
    // containers props:
    enterPolicy: PropTypes.func.isRequired,
    leavePolicy: PropTypes.func.isRequired
  };
  // #endregion

  componentDidMount() {
    this.props.enterPolicy();
  }

  componentWillUnmount() {
    this.props.leavePolicy();
  }

  render() {
    return (
      <I18n ns="translations">
        {(t, { i18n }) => (
          <div className="help-content">
            <div>
              <div className="text-center">
                <img src="/images/icons/ic_category_check_lg.png" alt="" />
              </div>
              <div className="mgt-20">
                <IFrame
                  url="https://shop.kuberacoin.com/webview/rule/persional_info.html"
                  height="2400px"
                  position="relative"
                />
              </div>
            </div>
          </div>
        )}
      </I18n>
    );
  }
}
