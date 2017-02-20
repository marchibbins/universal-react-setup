import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import About from './containers/About';
import NotFound from './containers/NotFound';

// Route configuration
// Read more https://github.com/rackt/react-router/blob/latest/docs/Glossary.md#routeconfig
const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="about" component={About} />
    <Redirect from="/redirect" to="/about" />
    <Route path="*" component={NotFound} status={404} />
  </Route>
);

// Export routes to be shared by both client and server-side
module.exports = routes;
