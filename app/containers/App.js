import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { asyncConnect } from 'redux-async-connect';

import { getWeather } from '../actions';
import styles from './App.css'; // eslint-disable-line

const App = ({ children, weather }) => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </header>
    <main>
      {children}
    </main>
    {weather}
  </div>
);

App.propTypes = {
  weather: PropTypes.string.isRequired,
};

// Note both asyncConnect and connect below can be implemented as decorators
export default
  // asyncConnect provides an array of promises need be resolved before rendering,
  // allowing us to fetch data (for redux state) and return populated components from the server
  asyncConnect([{
    promise: ({ store: { dispatch } }) => dispatch(getWeather()),
  }])(
  // Map redux state to props
  connect(({ weather }) => ({ weather }))(
    App,
  ));
