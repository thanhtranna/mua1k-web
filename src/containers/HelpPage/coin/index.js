// @flow weak

import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';
import * as viewsActions            from '../../../actions/viewAction';
import * as exchangeCoinActions     from '../../../actions/exchangeCoinActions';
import Coin                         from './Coin';

const mapStateToProps = (state) => {
    return {
        point:      state.exchangeCoin.point,
        token:      state.userAuth.token,
        message:    state.exchangeCoin.message,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                // containers:
                ...viewsActions,
                // coin actions:
                ...exchangeCoinActions,
            },
            dispatch
        ),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Coin);
