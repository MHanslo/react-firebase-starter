import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../index';

/**
 * Component render
 */
it('should render without errors', () => {
  const component = renderer.create(
    <Button />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('should change classes based on props', () => {
  const component = renderer.create(
    <Button isLoading isPrimary />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
