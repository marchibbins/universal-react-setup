import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext, match } from 'react-router';

import configureStore from './store/configureStore';
import routes from './routes';

// Base HTML template file, with injected rendered React content
const renderPage = (renderedContent, initialState) =>
  `<!DOCTYPE html>
  <html lang="en">
  <head>
    <title>Hello world</title>
    ${process.env.NODE_ENV === 'production'
      ? '<link rel="stylesheet" href="/assets/styles.css">'
      : /* Styles are loaded inline during development by JS modules */ ''}
  </head>
  <body>
    <div id="app">${renderedContent}</div>
    <script type="text/javascript">window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
    <script type="text/javascript" src="/assets/bundle.js"></script>
  </body>
  </html>`;

// Export a rendering function to be used by the Express server
module.exports = (req, res) => {
  const store = configureStore();

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
      // Success, render application server-side (to string) with Router context
      const App = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
      const componentHTML = renderToString(App);
      const initialState = store.getState();
      res.status(200).end(renderPage(componentHTML, initialState));
    } else {
      // No matches were found
      res.status(404).send('Not Found');
    }
  });
};
