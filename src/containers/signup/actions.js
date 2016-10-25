
/*
 * Signup Actions
 *
 */

import { browserHistory } from 'react-router';
import { firebaseAuth } from '../../firebase';

import {
 SIGNUP_REQUEST,
 SIGNUP_REQUEST_SUCCESS,
 SIGNUP_REQUEST_FAILURE
} from './constants';

import { login } from '../app/actions';

/**
 * Dispatched when a user attempts to sign up
 *
 * @return {object} Action with a type of SIGNUP_REQUEST
 */
export function signupRequest() {
  return {
    type: SIGNUP_REQUEST
  };
}

/**
 * Dispatched when user sign up succeeds
 *
 * @return {object} Action with a type of SIGNUP_REQUEST_SUCCESS
 */
export function signupRequestSuccess() {
  return {
    type: SIGNUP_REQUEST_SUCCESS
  };
}

/**
 * Dispatched when user sign up fails
 *
 * @return {object} Action with a type of SIGNUP_REQUEST_ERROR with error
 */
export function signupRequestError(error) {
  return {
    type: SIGNUP_REQUEST_FAILURE,
    error
  };
}

/**
 * Sign up button clicked
 *
 * @param  {string} email The user email
 * @param  {string} password The user password
 *
 */
export function signupButtonClicked(email, password) {
  return function(dispatch) {
    dispatch(signupRequest());
    const promise = firebaseAuth.createUserWithEmailAndPassword(email, password);
    return promise.then((response) => {
      dispatch(login(response));
      setTimeout(() => {
        browserHistory.push('/');
        dispatch(signupRequestSuccess());
      }, 1000);
    }).catch((error) => {
      dispatch(signupRequestError(error));
    });
  };
}
