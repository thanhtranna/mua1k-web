// @flow strong

// #region imports
import React, { PureComponent } from 'react';
import { I18n } from 'react-i18next';
import PropTypes from 'prop-types';
import { ConfirmModal, NotifyModal } from '../../../components';
// #endregion

export default class Coin extends PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.setPoint = this.setPoint.bind(this);
    this.exchangeCoin = this.exchangeCoin.bind(this);
  }

  // #region propTypes
  static propTypes = {
    // containers props:
    actions: PropTypes.shape({
      enterCoin: PropTypes.func.isRequired,
      leaveCoin: PropTypes.func.isRequired,
      setPoint: PropTypes.func.isRequired
    }),
    point: PropTypes.number.isRequired
  };
  // #endregion

  componentDidMount() {
    this.props.actions.enterCoin();
  }

  componentWillUnmount() {
    this.props.actions.leaveCoin();
  }

  setPoint(point) {
    this.props.actions.setPoint(point);
  }

  exchangeCoin() {
    const {
      actions: { exchangeCoinIfNeeded },
      point,
      token
    } = this.props;
    exchangeCoinIfNeeded(point, token);
  }

  render() {
    const { point, message } = this.props;

    return (
      <I18n ns="translations">
        {(t, { i18n }) => (
          <div className="help-content">
            <div>
              <div className="text-center">
                <h3 className="mgt-20">{t('Coin exchange')}</h3>
              </div>
              <div className="mgt-20">
                <div className="common-table green-table">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover mg0">
                      <thead>
                        <tr>
                          <th colSpan="2">{t('Coin exchange')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{`1${t('coin')}`}</td>
                          <td>
                            <a
                              data-toggle="modal"
                              href="#modal-changecoin"
                              onClick={() => this.setPoint(1000)}
                              data-backdrop="static"
                              data-keyboard="false"
                            >
                              {`1000${t('point')}`}
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>{`10${t('coin')}`}</td>
                          <td>
                            <a
                              data-toggle="modal"
                              href="#modal-changecoin"
                              onClick={() => this.setPoint(10000)}
                              data-backdrop="static"
                              data-keyboard="false"
                            >
                              {`10000${t('point')}`}
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>{`100${t('coin')}`}</td>
                          <td>
                            <a
                              data-toggle="modal"
                              href="#modal-changecoin"
                              onClick={() => this.setPoint(100000)}
                              data-backdrop="static"
                              data-keyboard="false"
                            >
                              {`100000${t('point')}`}
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>{`1000${t('coin')}`}</td>
                          <td>
                            <a
                              data-toggle="modal"
                              href="#modal-changecoin"
                              onClick={() => this.setPoint(1000000)}
                              data-backdrop="static"
                              data-keyboard="false"
                            >
                              {`1000000${t('point')}`}
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <ConfirmModal
                  id={'modal-changecoin'}
                  title={t('Coin exchange')}
                  message={`${point / 1000}${t('coin')} = ${point}${t(
                    'point'
                  )}. ${t('Are you sure you want to exchange')}?`}
                  btnConfirmText={t('Yes')}
                  btnDiscardText={t('No')}
                  hrefConfirmBtn="#modal-notifi"
                  onClickConfirmBtn={() => this.exchangeCoin()}
                />
                <NotifyModal
                  id={'modal-notifi'}
                  title={t('Message')}
                  message={t(message)}
                  btnText={t('Close')}
                  messageKey={message}
                />
              </div>
            </div>
          </div>
        )}
      </I18n>
    );
  }
}
