// @flow strong

// #region imports
import React, { PureComponent } from 'react';
import { I18n } from 'react-i18next';
import IFrame from 'react-iframe';
import PropTypes from 'prop-types';
// #endregion

export default class Terms extends PureComponent<Props, State> {
  // #region propTypes
  static propTypes = {
    // containers props:
    enterTerms: PropTypes.func.isRequired,
    leaveTerms: PropTypes.func.isRequired
  };
  // #endregion

  componentDidMount() {
    this.props.enterTerms();
  }

  componentWillUnmount() {
    this.props.leaveTerms();
  }

  render() {
    return (
      <I18n ns="translations">
        {(t, { i18n }) => (
          <div className="help-content">
            <div>
              <div className="text-center">
                <img src="/images/icons/ic_list_lg.png" alt="" />
              </div>
              <div className="mgt-20">
                <IFrame
                  url="https://shop.kuberacoin.com/webview/rule/usage.html"
                  height="3800px"
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
