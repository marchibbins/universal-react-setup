import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';

import routes from './routes';

const renderPage = renderedContent =>
  `<!DOCTYPE html>
  <html lang="en">
  <head>
    <title>Hello world</title>
  </head>
  <body>
    <div id="app">${renderedContent}</div>
    <script type="text/javascript" src="/assets/app.js"></script>
  </body>
  </html>`;

const render = (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const componentHTML = renderToString(<RouterContext {...renderProps} />);
      res.status(200).end(renderPage(componentHTML));
    } else {
      res.status(404).send('Not Found');
    }
  });
};

export default render;
