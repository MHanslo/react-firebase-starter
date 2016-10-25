import React from 'react';
import renderer from 'react-test-renderer';
import * as types from '../constants';
import * as actions from '../actions';
import reducer from '../reducer';
import App from '../index';

/**
 * Container render
 */
it('should render without errors', () => {
  const component = renderer.create(
    <App />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

/**
 * Container actions
 */
describe('App actions', () => {
  it('should create an action when user authentication succeeds', () => {
    const response = 'auth success';
    const expectedAction = {
      type: types.LOGIN,
      response
    };
    expect(actions.login(response)).toEqual(expectedAction);
  });

  it('should create an action when user logs out', () => {
    const expectedAction = {
      type: types.LOGOUT
    };
    expect(actions.logout()).toEqual(expectedAction);
  });
});

describe('App reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      user: null
    });
  });

  it('should handle LOGIN', () => {
    expect(
      reducer({}, {
        type: types.LOGIN,
        response: 'response text'
      })
    ).toEqual({
      user: 'response text'
    });
  });

  it('should handle LOGOUT', () => {
    expect(
      reducer({}, {
        type: types.LOGOUT
      })
    ).toEqual({
      user: null
    });
  });
});
