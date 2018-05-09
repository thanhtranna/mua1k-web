// @flow weak
import { routerReducer }                 from 'react-router-redux';
import { combineReducers }               from 'redux';
import exchangeCoin                      from './exchangeCoin';
import { reducer as reduxFormReducer }   from 'redux-form';
import views                             from './views';
import userAuth                          from './userAuth';
import category                          from './category';
import contact                           from './contact';
import address                           from './address';
import campaign                          from './campaign';
import error                             from './error';
import auction                           from './auction';
import pointHistory                      from './pointHistory';
import chanceBuyHistory                  from './chanceBuyHistory';
import coinExchangeHistory               from './coinExchangeHistory';

export const reducers = {
    views,
    userAuth,
    category,
    contact,
    address,
    campaign,
    error,
    auction,
    pointHistory,
    exchangeCoin,
    chanceBuyHistory,
    coinExchangeHistory,
};

export default combineReducers({
    ...reducers,
    routing: routerReducer,
    form: reduxFormReducer,
});
