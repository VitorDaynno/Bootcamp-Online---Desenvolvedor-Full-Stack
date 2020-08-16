import React, { Component } from 'react';

class InfoInput extends Component {
  formatValue = (value) => {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      style: 'currency',
      currency: 'BRL',
    });
  };

  formatPercentage = (value) => {
    if (value || value === 0) {
      return value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: 'percent',
      });
    }
  };

  render() {
    const { title, value, percentage, customClass } = this.props;
    const { formatValue, formatPercentage } = this;

    const formattedValue = formatValue(value);
    const formattedPercentage = formatPercentage(percentage);

    const content = formattedPercentage
      ? `${formattedValue} (${formattedPercentage})`
      : formattedValue;

    return (
      <div className="input-field col s3">
        <input
          className={customClass}
          type="text"
          readOnly
          value={content}
          style={{ fontWeight: 'bold' }}
        ></input>
        <label>{title}</label>
      </div>
    );
  }
}

export default InfoInput;
