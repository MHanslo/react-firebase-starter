/*
 * App Reducer
 *
*/

import {
  LOGIN,
  LOGOUT
} from './constants';

const initialState = {
  user: null
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.response
      };
    case LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}
