import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const middleware = [thunk];

  if (process.env.NODE_ENV === 'development') {
    middleware.push(createLogger());
  }

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware),
  );

  if (module.hot) {
    // Enable hot module replacement for reducers
    module.hot.accept('../reducers/index.js', () => {
      const nextReducer = require('../reducers/index.js').default; // eslint-disable-line
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
