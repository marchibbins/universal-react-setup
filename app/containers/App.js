import React from 'react';
import { Link } from 'react-router';

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
