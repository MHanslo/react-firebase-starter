/**
*
* Button Component
*
*/

import React, { PropTypes } from 'react';
import classNames from 'classnames';

function Button(props) {
  const buttonClass = classNames('button', {
    'is-primary': props.isPrimary,
    'is-loading': props.isLoading
  });

  return (
    <div>
      <button className={buttonClass} onClick={props.onClick}>{props.children}</button>
    </div>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  isPrimary: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node
};

export default Button;
