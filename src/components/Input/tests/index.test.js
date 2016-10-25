import React from 'react';
import renderer from 'react-test-renderer';
import Input from '../index';

/**
 * Component render
 */
it('should render without errors', () => {
  const component = renderer.create(
    <Input type="text" label="label" placeholder="placeholder" />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render an error if hasError is in props', () => {
  const component = renderer.create(
    <Input type="text" hasError="error message" />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
