import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
  const { labelText, onChange, dataTestId, placeHolder, type, value, id } = props;

  return (
    <label htmlFor={ id }>
      { labelText }
      <input
        id={ id }
        value={ value }
        type={ type }
        onChange={ onChange }
        data-testid={ dataTestId }
        placeholder={ placeHolder }
      />
    </label>
  );
};

Input.propTypes = {
  labelText: PropTypes.string,
  onChange: PropTypes.func,
  dataTestId: PropTypes.string,
  placeHolder: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  id: PropTypes.string,
};

Input.defaultProps = {
  labelText: '',
  onChange: () => {},
  dataTestId: '',
  placeHolder: '',
  value: PropTypes.string.isRequired,
  id: '',
};

export default Input;
