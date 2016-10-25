/*
 * Login Reducer
 *
*/

import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE
} from './constants';

const initialState = {
  isAuthenticating: false,
  emailError: null,
  passwordError: null
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticating: true,
        emailError: null,
        passwordError: null
      };
    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        isAuthenticating: false
      };
    case LOGIN_REQUEST_FAILURE:
      if (action.error.code === 'auth/wrong-password') {
        return {
          ...state,
          isAuthenticating: false,
          emailError: null,
          passwordError: action.error.message
        };
      }
      return {
        ...state,
        isAuthenticating: false,
        emailError: action.error.message,
        passwordError: null
      };
    default:
      return state;
  }
}
