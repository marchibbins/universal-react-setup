/* eslint-disable global-require */

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

const rootElement = document.getElementById('app');

const renderApp = () => {
  // Require routes within block scope (see hot reloading below)
  const routes = require('./routes');
  // Client application uses Router component and browser history
  const App = () => (
    <Router history={browserHistory}>
      {routes}
    </Router>
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
  // Use routes as dependency
  module.hot.accept('./routes.jsx', () => {
    setTimeout(hotRender);
  });
}

renderApp();
