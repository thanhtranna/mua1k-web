// @flow weak
import React, {Component} from 'react';
import {
  // Router, // using now ConnectedRouter from react-router-redux v5.x (the only
  // one compatible react-router 4)
  Switch
} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {history} from './store/configureStore';
import configureStore from './store/configureStore.dev';
import {
  ScrollTop,
  // PrivateRoute
} from './components';
import {Main} from './containers/Main';

const store = configureStore();

// #region flow types
type
Props = any;
type
State = any;
// #endregion

class App extends Component < Props, State > {
  render() {
    return (
      <Provider store={store}>
        <div>
          <ConnectedRouter history={history}>
            <ScrollTop>
              <Switch>
                <Main/>
              </Switch>
            </ScrollTop>
          </ConnectedRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
