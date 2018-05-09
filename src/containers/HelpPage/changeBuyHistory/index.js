// @flow weak

import { bindActionCreators }            from 'redux';
import { connect }                       from 'react-redux';
import * as viewsActions                 from '../../../actions/viewAction';
import * as chanceBuyHistoryActions      from '../../../actions/chanceBuyHistoryActions';
import ChanceBuyHistory                  from './ChangeBuyHistory';

const mapStateToProps = (state) => {
    return {
        //chance buy history
        chanceBuyHistories:   state.chanceBuyHistory.chanceBuyHistories,
        page:           state.chanceBuyHistory.page,
        pages:          state.chanceBuyHistory.pages,
        total:          state.chanceBuyHistory.total,
        limit:          state.chanceBuyHistory.limit,
        token:          state.userAuth.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                // containers:
                ...viewsActions,
                // chanceBuyHistory
                ...chanceBuyHistoryActions
            },
            dispatch
        ),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChanceBuyHistory);
