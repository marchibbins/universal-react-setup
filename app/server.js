import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match } from 'react-router';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';

import configureStore from './store/configureStore';
import routes from './routes';
import Html from './containers/Html';

// Base HTML template file, with injected rendered React content
const render = (componentHTML, initialState) =>
  `<!DOCTYPE html>\n${renderToString(<Html componentHTML={componentHTML} initialState={initialState} />)}`;

// Export a rendering function to be used by the Express server
module.exports = (req, res) => {
  // Match a set of routes to a location, callback returns three arguments
  // - error: a javascript Error object if an error occured
  // - redirectLocation: a Location object if the route is a redirect
  // - renderProps: props to pass to the routing context if the route is matched
  // These three enable us to response appropriately
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      // Javascript error
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      // Redirection
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const store = configureStore();
      // Success, render application server-side (to string) with Router context
      loadOnServer({ ...renderProps, store }).then(() => { // Resolve all asyncConnect promises
        // ReduxAsyncConnect returns RouterContext
        const App = () => (
          <Provider store={store}>
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );
        const componentHTML = renderToString(<App />);
        const initialState = store.getState();
        // Determine status from route configuration
        const routeStatus = renderProps.routes[renderProps.routes.length - 1].status || 200;
        res.status(routeStatus).end(render(componentHTML, initialState));
      });
    } else {
      // No matches were found (unreachable with 404 catch-all route)
      res.status(404).send('Not Found');
    }
  });
};
