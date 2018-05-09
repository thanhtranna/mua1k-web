// @flow strong

// #region imports
import React, { PureComponent } from 'react';
import { I18n } from 'react-i18next';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { checkUndefined } from '../../../helpers';
// #endregion

export default class Address extends PureComponent<Props, State> {
  // #region propTypes
  static propTypes = {
    // containers props:
    enterAddress: PropTypes.func.isRequired,
    leaveAddress: PropTypes.func.isRequired
  };
  // #endregion

  componentDidMount() {
    const { enterAddress, getAddressIfNeed, token } = this.props;
    enterAddress();
    getAddressIfNeed(token);
  }

  componentWillUnmount() {
    const { leaveAddress } = this.props;
    leaveAddress();
  }

  render() {
    const { address } = this.props;

    return (
      <I18n ns="translations">
        {(t, { i18n }) => (
          <div className="help-content">
            <div>
              <div className="text-center">
                <h3 className="mgt-20">{t('list_address_title')}</h3>
              </div>
              <div className="mgt-20">
                <div className="address-book">
                  <div className="row address-book-list">
                    {address.map((addr, key) => (
                      <div
                        key={key}
                        className="col-xs-12 col-sm-6 col-md-6 col-md-offset-3"
                      >
                        <div className="address-book-item">
                          <div className="address-book-item-header">
                            <div
                              className="abih-title"
                              style={
                                addr.isDefault
                                  ? {}
                                  : {
                                      backgroundColor: '#ccc',
                                      color: '#5f3f3f'
                                    }
                              }
                            >
                              <i
                                className="fa fa-map-marker"
                                aria-hidden="true"
                              />
                              <span>{t('list_address_name_area')}</span>
                            </div>
                            <Link className="abih-btn" to="/">
                              <i className="fa fa-pencil" aria-hidden="true" />
                            </Link>
                          </div>
                          <div className="address-book-item-body">
                            <p>
                              <span>{t('Fullname')}:</span>
                              {checkUndefined(addr.fullname)}
                            </p>
                            <p>
                              <span>{t('Phone')}:</span>
                              {checkUndefined(addr.phone)}
                            </p>
                            <p>
                              <span>{t('Postcode')}:</span>
                              {checkUndefined(addr.postcode)}
                            </p>
                            <p>
                              <span>{t('Address')}:</span>
                              {checkUndefined(addr.address)}
                            </p>
                            <p>
                              <span>{t('Province')}:</span>
                              {checkUndefined(addr.province)}
                            </p>
                            <p>
                              <span>{t('District')}:</span>
                              {checkUndefined(addr.district)}
                            </p>
                            <p>
                              <span>{t('Town')}:</span>
                              {checkUndefined(addr.town)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mgt-20">
                    <Link
                      to={`/help/address/addnew`}
                      className="btn btn-green-1 btn-square"
                    >
                      <i className="fa fa-plus-circle" aria-hidden="true" />
                      {t('list_address_btn_add')}
                    </Link>
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
