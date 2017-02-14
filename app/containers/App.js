import React from 'react';
import { Link } from 'react-router';

import styles from './App.css'; // eslint-disable-line

const App = ({ children }) => ( // eslint-disable-line
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </header>
    <main>
      {children}
    </main>
  </div>
);

export default App;
