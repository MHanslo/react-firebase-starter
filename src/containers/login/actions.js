
/*
 * Login Actions
 *
 */

 import { browserHistory } from 'react-router';
 import { firebaseAuth } from '../../firebase';

 import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE
 } from './constants';

 import {
  login,
  logout
} from '../app/actions';

 /**
  * Dispatched when a user login request is initiated
  *
  * @return {object} Action with a type of LOGIN_REQUEST
  */
 export function loginRequest() {
   return {
     type: LOGIN_REQUEST
   };
 }

 /**
  * Dispatched when user authentication succeeds
  *
  * @param  {object} Action with a type of LOGIN_REQUEST_SUCCESS
  *
  */
 export function loginRequestSuccess() {
   return {
     type: LOGIN_REQUEST_SUCCESS
   };
 }

 /**
  * Dispatched when user authentication fails
  *
  * @param  {object} error The error
  *
  * @return {object} Action with a type of LOGIN_REQUEST_ERROR with error
  */
 export function loginRequestError(error) {
   return {
     type: LOGIN_REQUEST_FAILURE,
     error
   };
 }

 /**
 * Ends Firebase session, redirects to /login, and dispatches logout() action
 *
 */
 export function logoutAndRedirect() {
   return (dispatch) => {
     return firebaseAuth.signOut().then(() => {
       dispatch(logout());
       browserHistory.push('/');
     }, (error) => {
       // An error happened.
     });
   };
 }

 /**
  * Login button clicked
  *
  * @param  {string} email The user email
  * @param  {string} password The user password
  *
  */
 export function loginButtonClicked(email, password) {
   return (dispatch) => {
     dispatch(loginRequest());
     const promise = firebaseAuth.signInWithEmailAndPassword(email, password);
     return promise.then((response) => {
       dispatch(login({
         id: response.uid,
         displayName: response.displayName,
         photoURL: response.photoURL,
         emailVerified: response.emailVerified,
         email: response.email
       }));
       setTimeout(() => {
         browserHistory.push('/');
         dispatch(loginRequestSuccess());
       }, 1000);
     }).catch((error) => {
       dispatch(loginRequestError(error));
     });
   };
 }
