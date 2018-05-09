// @flow strong

// #region imports
import React, { PureComponent } from 'react';
import { I18n } from 'react-i18next';
import PropTypes from 'prop-types';
import { checkUndefined, dateFormatter } from '../../../helpers';
import { Pagination } from '../../../components';
// #endregion

export default class History extends PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.handlePageChange = this.handlePageChange.bind(this);
  }
  // #region propTypes
  static propTypes = {
    // containers props:
    actions: PropTypes.shape({
      enterCoinExchangeHistory: PropTypes.func.isRequired,
      leaveCoinExchangeHistory: PropTypes.func.isRequired,
      getCoinExchangeHistoryIfNeeded: PropTypes.func.isRequired
    }),
    token: PropTypes.string.isRequired,
    page: PropTypes.string.isRequired,
    pages: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    coinExchangeHistories: PropTypes.array.isRequired
  };
  // #endregion

  componentDidMount() {
    const {
      actions: { enterCoinExchangeHistory, getCoinExchangeHistoryIfNeeded },
      token,
      page
    } = this.props;
    enterCoinExchangeHistory();
    getCoinExchangeHistoryIfNeeded(page, token);
  }

  componentWillUnmount() {
    this.props.actions.leaveCoinExchangeHistory();
  }

  handlePageChange(page) {
    const {
      actions: { getCoinExchangeHistoryIfNeeded },
      token
    } = this.props;
    getCoinExchangeHistoryIfNeeded(page, token);
  }

  render() {
    const { coinExchangeHistories, pages, total, limit } = this.props;
    const page = parseInt(this.props.page, 0);
    return (
      <I18n ns="translations">
        {(t, { i18n }) => (
          <div className="help-content">
            <div>
              <div className="text-center">
                <h3 className="mgt-20">{t('point_history_title')}</h3>
              </div>
              <div className="mgt-20">
                <div className="common-table">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover mg0">
                      <thead>
                        <tr>
                          <th>{t('point_history_table_date')}</th>
                          <th>{t('point_history_table_point')}</th>
                          <th>{t('point_history_table_coin')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coinExchangeHistories.map((item, key) => (
                          <tr key={key}>
                            <td>{dateFormatter(item.createdAt)}</td>
                            <td>{checkUndefined(item.point)}</td>
                            <td>{checkUndefined(item.coin)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Pagination
                    data={coinExchangeHistories}
                    limit={limit}
                    onChange={this.handlePageChange}
                    page={page}
                    pages={pages}
                    total={total}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </I18n>
    );
  }
}
