import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import About from './containers/About';

// Route configuration
// Read more https://github.com/rackt/react-router/blob/latest/docs/Glossary.md#routeconfig
const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="about" component={About} />
  </Route>
);

// Export routes to be shared by both client and server-side
module.exports = routes;
