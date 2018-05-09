// @flow weak

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as viewsActions from '../../../actions/viewAction';
import * as coinExchangeHistoryActions from '../../../actions/coinExchangeHistoryActions';
import coinExchangeHistory from './History';

const mapStateToProps = state => {
  return {
    //chance buy history
    coinExchangeHistories: state.coinExchangeHistory.coinExchangeHistories,
    page: state.coinExchangeHistory.page,
    pages: state.coinExchangeHistory.pages,
    total: state.coinExchangeHistory.total,
    limit: state.coinExchangeHistory.limit,
    token: state.userAuth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        // containers:
        ...viewsActions,
        // coinExchangeHistory
        ...coinExchangeHistoryActions
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  coinExchangeHistory
);
