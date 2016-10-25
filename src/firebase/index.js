/*
 * Firebase Config
 *
 * Here we import our Firebase credentials and instantiate service instances
 * for use across the app. By default we only export the Auth service.
 */

import firebase from 'firebase';
import { firebaseConfig } from './config';

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();
