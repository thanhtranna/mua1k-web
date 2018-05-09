// @flow
/* eslint no-process-env:0 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../containers/home';
import Login from '../containers/login';
import Register from '../containers/register';
import HelpPage from '../containers/HelpPage';
import ChatBox from '../components/chatBox/chatBox';
import PageNotFound from '../containers/pageNotFound';
import pageBadRequest from '../containers/pageBadRequest';

export const MainRoutes = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route exact path="/" component={Home} />
    <Route path="/help" component={HelpPage} />
    <Route path="/chat" component={ChatBox} />
    <Route path="/error" component={pageBadRequest} />
    <Route component={PageNotFound} />
  </Switch>
);

export default MainRoutes;
