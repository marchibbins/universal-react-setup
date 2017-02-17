/* eslint-disable global-require */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { ReduxAsyncConnect } from 'redux-async-connect';

import configureStore from './store/configureStore';

const rootElement = document.getElementById('app');

const renderApp = () => {
  // Configure store with global state injected by server-generated HTML
  const store = configureStore(window.__INITIAL_STATE__); // eslint-disable-line

  // Require routes within block scope (see hot reloading below)
  const routes = require('./routes');

  // Client application uses Router component, browser history and Redux async middleware
  const App = () => (
    <Provider store={store}>
      <Router history={browserHistory} render={props => <ReduxAsyncConnect {...props} />}>
        {routes}
      </Router>
    </Provider>
  );
  render(<App />, rootElement);
};

// Support hot reloading of components
if (module.hot) {
  const RedBox = require('redbox-react');
  const hotRender = () => {
    try {
      renderApp();
    } catch (error) {
      // Show overlay for runtime errors
      render(<RedBox error={error} />, rootElement);
    }
  };
  // Use routes as dependency entry
  module.hot.accept('./routes.js', hotRender);
}

renderApp();
