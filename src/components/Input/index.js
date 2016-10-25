/**
*
* Input Component
*
*/

import React, { PropTypes } from 'react';
import classNames from 'classnames';

function Input(props) {
  const inputClass = classNames('input', {
    'is-danger': props.hasError
  });
  let message = '';
  if (props.hasError) {
    message = (
      <span className="help is-danger">{props.hasError}</span>
    );
  }

  return (
    <div>
      <label className="label">{props.label}</label>
      <div style={{marginBottom: '10px'}}>
        <input
          className={inputClass}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
      {message}
      </div>
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  hasError: PropTypes.string,
  onChange: PropTypes.func
};

export default Input;
