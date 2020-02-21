import rootReducer from '../store/reducers/tracks';
import { middlewares } from './middlewares';
import { createStore, applyMiddleware } from 'redux';

export const storeFactory = initialState => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(rootReducer, initialState);
};
