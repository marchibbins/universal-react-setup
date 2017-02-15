import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { increment, decrement } from '../actions';

const Counter = ({ count, dispatch }) => (
  <div>
    Counter: {` ${count} `}
    <button onClick={() => dispatch(increment())}>+</button>
    <button onClick={() => dispatch(decrement())}>-</button>
  </div>
);

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ count }) => ({ count });

export default connect(mapStateToProps)(Counter);
