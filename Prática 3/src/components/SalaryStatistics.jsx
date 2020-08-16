import React, { Component } from 'react';

import Bar from './Bar';

class SalaryStatistics extends Component {
  render() {
    const { discountINSS, discountIRPF, netSalary } = this.props;
    console.log(this.props);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '10px',
        }}
      >
        <Bar color="#e67e22" size={discountINSS * 100}></Bar>
        <Bar color="#c0392b" size={discountIRPF * 100}></Bar>
        <Bar color="#16a085" size={netSalary * 100}></Bar>
      </div>
    );
  }
}

export default SalaryStatistics;
