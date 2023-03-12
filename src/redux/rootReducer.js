// rootReducer.js

import { combineReducers } from 'redux';
import apiReducer from './reducer/apiReducer';

const rootReducer = combineReducers({
  api: apiReducer,
  // ...outros reducers
});

export default rootReducer;