// @flow strong

// #region imports
import React, { PureComponent } from 'react';
import { I18n } from 'react-i18next';
import IFrame from 'react-iframe';
import PropTypes from 'prop-types';
// #endregion

export default class Help extends PureComponent<Props, State> {
  // #region propTypes
  static propTypes = {
    // containers props:
    enterHelp: PropTypes.func.isRequired,
    leaveHelp: PropTypes.func.isRequired
  };
  // #endregion

  componentDidMount() {
    this.props.enterHelp();
  }

  componentWillUnmount() {
    this.props.leaveHelp();
  }

  render() {
    return (
      <I18n ns="translations">
        {(t, { i18n }) => (
          <div className="help-content">
            <div className="text-center">
              <img src="/images/icons/ic_question_lg.png" alt="" />
            </div>
            <div className="mgt-20">
              <IFrame
                url="https://shop.kuberacoin.com/webview/helps/"
                height="2900px"
                position="relative"
              />
            </div>
          </div>
        )}
      </I18n>
    );
  }
}
