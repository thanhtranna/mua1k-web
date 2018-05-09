// @flow strong

// #region imports
import React, { PureComponent } from 'react';
import { I18n } from 'react-i18next';
import PropTypes from 'prop-types';
import { checkUndefined, dateFormatter, truncateText } from '../../../helpers';
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
      enterChanceBuyHistory: PropTypes.func.isRequired,
      leaveChanceBuyHistory: PropTypes.func.isRequired,
      getChanceBuyHistoryIfNeeded: PropTypes.func.isRequired
    }),
    token: PropTypes.string.isRequired,
    page: PropTypes.string.isRequired,
    pages: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    chanceBuyHistories: PropTypes.array.isRequired
  };
  // #endregion

  componentDidMount() {
    const {
      actions: { enterChanceBuyHistory, getChanceBuyHistoryIfNeeded },
      token,
      page
    } = this.props;
    enterChanceBuyHistory();
    getChanceBuyHistoryIfNeeded(page, token);
  }

  componentWillUnmount() {
    this.props.actions.leaveChanceBuyHistory();
  }

  handlePageChange(page) {
    const {
      actions: { getChanceBuyHistoryIfNeeded },
      token
    } = this.props;
    getChanceBuyHistoryIfNeeded(page, token);
  }

  render() {
    const { chanceBuyHistories, pages, total, limit } = this.props;
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
                          <th>{t('point_history_table_product')}</th>
                          <th>{t('point_history_table_aid')}</th>
                          <th>{t('point_history_table_number_chance_buy')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {chanceBuyHistories.map((item, key) => (
                          <tr key={key}>
                            <td>{dateFormatter(item.createdAt)}</td>
                            <td>
                              {truncateText(
                                item &&
                                  item.auction &&
                                  item.auction.product &&
                                  item.auction.product.name
                              )}
                            </td>
                            <td>{item && item.auction && item.auction.aid}</td>
                            <td>{checkUndefined(item.numberChanceBuy)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Pagination
                    data={chanceBuyHistories}
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
