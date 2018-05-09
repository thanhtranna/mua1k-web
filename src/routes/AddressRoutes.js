// @flow
/* eslint no-process-env:0 */
import React                    from 'react';
import {
  Route,
  Switch
}                               from 'react-router-dom';
import Address                  from "../containers/HelpPage/address";
import AddNewAddress            from "../containers/HelpPage/address/addnew";
import PageNotFound             from '../containers/pageNotFound';
import pageBadRequest           from '../containers/pageBadRequest';

export const HelpPageRoutes = () => (
  <Switch>
    <Route exact path="/help/address" component={Address} />
    <Route path="/help/address/addnew" component={AddNewAddress} />
    <Route path="/error" component={pageBadRequest} />
    <Route component={PageNotFound} />
  </Switch>
);

export default HelpPageRoutes;
