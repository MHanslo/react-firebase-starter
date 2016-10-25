
/*
 * Root Reducer
 *
 * This is where we combine all our reducers into a single reducer function
 * that we can pass into createStore()
 */

import { combineReducers } from 'redux';
import appReducer from './containers/app/reducer';
import loginReducer from './containers/login/reducer';
import signupReducer from './containers/signup/reducer';

export default combineReducers({
  app: appReducer,
  login: loginReducer,
  signup: signupReducer
});
