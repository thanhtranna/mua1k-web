// @flow
/* eslint no-process-env:0 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Help from '../containers/HelpPage/help';
import EditProfile from '../containers/HelpPage/editprofile';
import Contact from '../containers/HelpPage/contact';
import Policy from '../containers/HelpPage/policy';
import Terms from '../containers/HelpPage/terms';
import Friend from '../containers/HelpPage/friend';
import Point from '../containers/HelpPage/point';
import Coin from '../containers/HelpPage/coin';
import AddressRoutes from '../routes/AddressRoutes';
import History from '../containers/HelpPage/history';
import PageNotFound from '../containers/pageNotFound';
import pageBadRequest from '../containers/pageBadRequest';
import PageChanceBuyHistory from '../containers/HelpPage/changeBuyHistory';
import PageWinHistory from '../containers/HelpPage/winhistory';

export const HelpPageRoutes = () => (
  <Switch>
    <Route exact path="/help" component={Help} />
    <Route path="/help/edit_profile" component={EditProfile} />
    <Route path="/help/contact" component={Contact} />
    <Route path="/help/friend" component={Friend} />
    <Route path="/help/point" component={Point} />
    <Route path="/help/coin" component={Coin} />
    <Route path="/help/address" component={AddressRoutes} />
    <Route path="/help/coin_exchange_history" component={History} />
    <Route path="/help/winner_history" component={PageWinHistory} />
    <Route path="/help/chance_buy_history" component={PageChanceBuyHistory} />
    <Route path="/help/policy" component={Policy} />
    <Route path="/help/terms" component={Terms} />
    <Route path="/error" component={pageBadRequest} />
    <Route component={PageNotFound} />
  </Switch>
);
/*  */
export default HelpPageRoutes;
