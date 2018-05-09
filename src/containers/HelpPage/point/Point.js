// @flow strong

// #region imports
import React, { PureComponent } from 'react';
import { I18n }                 from 'react-i18next';
import PropTypes from "prop-types";
import {checkUndefined, dateFormatter} from '../../../helpers';
import {Pagination} from '../../../components';
// #endregion

export default class Point extends PureComponent<Props, State> {
    constructor(props) {
        super(props);

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    // #region propTypes
    static propTypes = {
        actions: PropTypes.shape({
            enterPointExchangeHistory:       PropTypes.func.isRequired,
            leavePointExchangeHistory:       PropTypes.func.isRequired,
            getPointHistoryIfNeeded:   PropTypes.func.isRequired,
        }),
        token:                  PropTypes.string.isRequired,
        page:                   PropTypes.string.isRequired,
        pages:                  PropTypes.number.isRequired,
        total:                  PropTypes.number.isRequired,
        limit:                  PropTypes.number.isRequired,
        pointHistory:           PropTypes.array.isRequired
    };
    // #endregion

    componentDidMount() {
        const {
            actions: {
                enterPointExchangeHistory,
                getPointHistoryIfNeeded,
            },
            token,
            page,
        } = this.props;
        enterPointExchangeHistory();
        getPointHistoryIfNeeded(page, token);
    }

    componentWillUnmount() {
        this.props.actions.leavePointExchangeHistory();
    }

    handlePageChange(page) {
        const {
            actions: {
                getPointHistoryIfNeeded,
            },
            token,
        } = this.props;
        getPointHistoryIfNeeded(page, token);
    }

    render() {
        const {
            pointHistory,
            pages,
            total,
            limit,
        } = this.props;
        const page = parseInt(this.props.page, 0);

        return (
            <I18n ns="translations">
                {
                    (t, {i18n}) => (
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
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    pointHistory.map((item, key) => (
                                                        <tr key={key}>
                                                            <td>{ dateFormatter(item.createdAt) }</td>
                                                            <td>{ checkUndefined(item.point) }</td>
                                                        </tr>
                                                    ))
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                        <Pagination data={pointHistory} limit={limit} onChange={this.handlePageChange} page={page} pages={pages} total={total}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </I18n>
        );
    }
}
