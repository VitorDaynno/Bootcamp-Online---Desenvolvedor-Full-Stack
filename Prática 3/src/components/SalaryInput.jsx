import React, { Component } from 'react';

class SalaryInput extends Component {
  changeValue = (event) => {
    const { onChange } = this.props;
    const { value } = event.target;

    value && value > 0 ? onChange(value) : onChange(0);
  };
  render() {
    const { title } = this.props;
    const { changeValue } = this;
    return (
      <div className="input-field">
        <input type="number" onChange={changeValue}></input>
        <label>{title}</label>
      </div>
    );
  }
}

export default SalaryInput;
