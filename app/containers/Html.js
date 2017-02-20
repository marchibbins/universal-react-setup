/* eslint-disable react/no-danger */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

const Html = ({ componentHTML, initialState }) => {
  const head = Helmet.rewind();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        {head.title.toComponent()}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {process.env.NODE_ENV === 'production'
          && <link rel="stylesheet" href="/assets/styles.css" />
          /* Styles are loaded inline during development by JS modules */}
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: componentHTML }} />
        <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};` }} />
        <script type="text/javascript" src="/assets/bundle.js" />
      </body>
    </html>
  );
};

Html.propTypes = {
  componentHTML: PropTypes.string.isRequired,
  initialState: PropTypes.shape().isRequired,
};

export default Html;
