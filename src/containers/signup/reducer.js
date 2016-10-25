
/*
 * Signup Reducer
 *
 */

import {
  SIGNUP_REQUEST,
  SIGNUP_REQUEST_SUCCESS,
  SIGNUP_REQUEST_FAILURE
} from './constants';

const initialState = {
  isAuthenticating: false,
  emailError: null,
  passwordError: null
};

export default function signupReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        isAuthenticating: true
      };
    case SIGNUP_REQUEST_SUCCESS:
      return {
        ...state,
        isAuthenticating: false
      };
    case SIGNUP_REQUEST_FAILURE:
      if (action.error.code === 'auth/weak-password') {
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
