import React, {PropTypes} from 'react';

const FuelSavingsTextInput = (props) => {
  const handleChange = (e) => {
    props.onChange(props.name, e.target.value);
  };

  const handleBlur = (e) => {
    props.onBlur(props.name, e.target.value);
  };

  return (
    <input
      className="col-sm-2"
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onBlur={handleBlur}
      onChange={handleChange}/>
  );
};

FuelSavingsTextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default FuelSavingsTextInput;
