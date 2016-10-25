import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import * as types from '../constants';
import * as actions from '../actions';
import { LOGIN, LOGOUT } from '../../app/constants';
import reducer from '../reducer';
import Login from '../index';

jest.mock('react-router');
jest.mock('../../../firebase');
const mockStore = configureStore([ thunk ]);
const initalState = {
  isAuthenticating: false,
  emailError: null,
  passwordError: null
};
const store = mockStore({
  login: initalState
});

/**
 * Container render
 */
it('should render without errors', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

/**
 * Container actions
 */
describe('Login actions', () => {
  it('should create an action when a user login request is initiated', () => {
    const expectedAction = {
      type: types.LOGIN_REQUEST
    };
    expect(actions.loginRequest()).toEqual(expectedAction);
  });

  it('should create an action when when user authentication succeeds', () => {
    const expectedAction = {
      type: types.LOGIN_REQUEST_SUCCESS
    };
    expect(actions.loginRequestSuccess()).toEqual(expectedAction);
  });

  it('should create an action when user authentication fails', () => {
    const error = {
      code: 'auth/wrong-password',
      message: 'Password is incorrect.'
    };
    const expectedAction = {
      type: types.LOGIN_REQUEST_FAILURE,
      error
    };
    expect(actions.loginRequestError(error)).toEqual(expectedAction);
  });

  it('should create an action that logs in a user', () => {
    const expectedAction = [{
      type: types.LOGIN_REQUEST
    }, {
      type: LOGIN,
      response: {
        displayName: undefined,
        email: undefined,
        emailVerified: undefined,
        id: undefined,
        photoURL: undefined
      }
    }];
    const email = 'email@email.com';
    const password = 'password';
    return store.dispatch(actions.loginButtonClicked(email, password))
     .then(() => {
       expect(store.getActions()).toEqual(expectedAction);
     });
  });

  it('should create an action that logs out a user', () => {
    const expectedAction = { type: LOGOUT };
    return store.dispatch(actions.logoutAndRedirect())
     .then(() => {
       expect(store.getActions()[2]).toEqual(expectedAction);
     });
  });
});

describe('Login reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initalState);
  });

  it('should handle LOGIN_REQUEST', () => {
    expect(
      reducer({}, {
        type: types.LOGIN_REQUEST
      })
    ).toEqual({
      isAuthenticating: true,
      emailError: null,
      passwordError: null
    });
  });

  it('should handle LOGIN_REQUEST_SUCCESS', () => {
    expect(
      reducer({}, {
        type: types.LOGIN_REQUEST_SUCCESS
      })
    ).toEqual({
      isAuthenticating: false
    });
  });

  it('should handle LOGIN_REQUEST_FAILURE', () => {
    expect(
      reducer({}, {
        type: types.LOGIN_REQUEST_FAILURE,
        error: {
          code: 'auth/wrong-password',
          message: 'Wrong password provided.'
        }
      })
    ).toEqual({
      isAuthenticating: false,
      emailError: null,
      passwordError: 'Wrong password provided.'
    });
  });
});
