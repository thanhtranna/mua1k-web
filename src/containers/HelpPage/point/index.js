// @flow weak

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as viewsActions from '../../../actions/viewAction';
import * as pointHistoryActions from '../../../actions/pointHistoryActions';
import Point from './Point';

const mapStateToProps = state => {
  return {
    //point history
    pointHistory: state.pointHistory.pointHistory,
    page: state.pointHistory.page,
    pages: state.pointHistory.pages,
    total: state.pointHistory.total,
    limit: state.pointHistory.limit,
    token: state.userAuth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        // containers:
        ...viewsActions,
        // point history
        ...pointHistoryActions
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Point);
