/* eslint-disable global-require */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import configureStore from './store/configureStore';

const rootElement = document.getElementById('app');

const renderApp = () => {
  // Configure store with global state injected by server-generated HTML
  const store = configureStore(window.__INITIAL_STATE__); // eslint-disable-line

  // Require routes within block scope (see hot reloading below)
  const routes = require('./routes');

  // Client application uses Router component and browser history
  const App = () => (
    <Provider store={store}>
      <Router history={browserHistory}>
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
