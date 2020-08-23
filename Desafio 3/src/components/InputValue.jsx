import React from 'react';

function InputValue(props) {
  const { title, setValue, value, min, max } = props;

  const changeValue = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  return (
    <div className="input-field col s4">
      <input
        type="number"
        onChange={changeValue}
        value={value}
        min={min}
        max={max}
      ></input>
      <label>{title}</label>
    </div>
  );
}

export default InputValue;
