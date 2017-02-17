import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

import count from './count';
import weather from './weather';

export default combineReducers({
  reduxAsyncConnect,
  count,
  weather,
});
