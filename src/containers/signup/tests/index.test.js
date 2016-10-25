import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import * as types from '../constants';
import * as actions from '../actions';
import { LOGIN } from '../../app/constants';
import reducer from '../reducer';
import SignIn from '../index';

jest.mock('react-router');
jest.mock('../../../firebase');
const mockStore = configureStore([ thunk ]);
const initalState = {
  isAuthenticating: false,
  emailError: null,
  passwordError: null
};
const store = mockStore({
  signup: initalState
});

/**
 * Container render
 */
it('should render without errors', () => {
  const component = renderer.create(
    <Provider store={store}>
      <SignIn />
    </Provider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

/**
 * Container actions
 */
describe('Sign in actions', () => {
  it('should create an action when a user attempts to sign up', () => {
    const expectedAction = {
      type: types.SIGNUP_REQUEST
    };
    expect(actions.signupRequest()).toEqual(expectedAction);
  });

  it('should create an action when user sign up succeeds', () => {
    const expectedAction = {
      type: types.SIGNUP_REQUEST_SUCCESS
    };
    expect(actions.signupRequestSuccess()).toEqual(expectedAction);
  });

  it('should create an action when user sign up fails', () => {
    const error = 'sign in failed';
    const expectedAction = {
      type: types.SIGNUP_REQUEST_FAILURE,
      error
    };
    expect(actions.signupRequestError(error)).toEqual(expectedAction);
  });

  it('should create an action that signs in a user', () => {
    const expectedAction = [{
      type: types.SIGNUP_REQUEST
    }, {
      type: LOGIN,
      response: 'response'
    }];
    const email = 'email@email.com';
    const password = 'password';
    return store.dispatch(actions.signupButtonClicked(email, password))
     .then(() => {
       expect(store.getActions()).toEqual(expectedAction);
     });
  });
});

describe('Sign in reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initalState);
  });

  it('should handle SIGNUP_REQUEST', () => {
    expect(
      reducer({}, {
        type: types.SIGNUP_REQUEST
      })
    ).toEqual({
      isAuthenticating: true
    });
  });

  it('should handle SIGNUP_REQUEST_SUCCESS', () => {
    expect(
      reducer({}, {
        type: types.SIGNUP_REQUEST_SUCCESS
      })
    ).toEqual({
      isAuthenticating: false
    });
  });

  it('should handle SIGNUP_REQUEST_FAILURE', () => {
    expect(
      reducer({}, {
        type: types.SIGNUP_REQUEST_FAILURE,
        error: {
          code: 'auth/weak-password',
          message: 'Weak password provided.'
        }
      })
    ).toEqual({
      isAuthenticating: false,
      emailError: null,
      passwordError: 'Weak password provided.'
    });
  });
});
