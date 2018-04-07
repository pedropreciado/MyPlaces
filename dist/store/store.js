import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

const configureStore = (preloadedState = {}) => {
  createStore(
    preloadedState,
    applyMiddleware(thunk, logger)
  )
};

export default configureStore;
