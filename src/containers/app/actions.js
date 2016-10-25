
/*
 * App Actions
 *
 */

 import {
  LOGIN,
  LOGOUT
 } from './constants';

 /**
  * Dispatched when user authentication succeeds
  *
  * @param  {object} response Firebase auth response
  *
  * @return {object} Action with a type of LOGIN_REQUEST_SUCCESS with response
  */
 export function login(response) {
   return {
     type: LOGIN,
     response
   };
 }

 /**
 * Dispatches logout action
 *
 * @return {object} Action with a type of LOGOUT
 */
 export function logout() {
   return {
     type: LOGOUT
   };
 }
