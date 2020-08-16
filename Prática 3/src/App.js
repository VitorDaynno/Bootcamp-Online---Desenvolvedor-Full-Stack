import React, { Component } from 'react';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

import SalaryInput from './components/SalaryInput';
import InfoInput from './components/InfoInput';
import SalaryStatistics from './components/SalaryStatistics';

import { calculateSalaryFrom } from './helpers/salary';

class App extends Component {
  constructor() {
    super();
    M.AutoInit();
    this.state = {
      salary: 0,
      baseINSS: 0,
      discountINSS: 0,
      percentageDiscountINSS: 0,
      baseIRPF: 0,
      discountIRPF: 0,
      percentageDiscountIRPF: 0,
      netSalary: 0,
      percentageNetSalary: 0,
    };
  }

  componentDidUpdate(_, previousState) {
    const { salary: newSalary } = this.state;
    const { salary, baseINSS } = previousState;
    const resultsCalcs = calculateSalaryFrom(salary);

    const {
      baseINSS: newBaseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = resultsCalcs;

    const percentageDiscountINSS = this.findPercentage(salary, discountINSS);
    const percentageDiscountIRPF = this.findPercentage(salary, discountIRPF);
    const percentageNetSalary = this.findPercentage(salary, netSalary);

    if (salary !== newSalary || baseINSS !== newBaseINSS) {
      this.setState({
        baseINSS: newBaseINSS,
        discountINSS,
        percentageDiscountINSS,
        baseIRPF,
        discountIRPF,
        percentageDiscountIRPF,
        netSalary,
        percentageNetSalary,
      });
    }
  }

  changeSalary = (salary) => {
    this.setState({ salary });
  };

  findPercentage(totalValue, percentualValue) {
    return percentualValue / totalValue;
  }

  render() {
    const { changeSalary } = this;
    const {
      baseINSS,
      discountINSS,
      percentageDiscountINSS,
      baseIRPF,
      discountIRPF,
      percentageDiscountIRPF,
      netSalary,
      percentageNetSalary,
    } = this.state;

    return (
      <div className="App">
        <h3 className="center">React Salário</h3>
        <div className="row" style={{ margin: '15px' }}>
          <SalaryInput
            title={'Salário Bruto'}
            onChange={changeSalary}
          ></SalaryInput>
          <InfoInput title={'Base INSS:'} value={baseINSS}></InfoInput>
          <InfoInput
            title={'Desconto INSS:'}
            value={discountINSS}
            percentage={percentageDiscountINSS}
            customClass={'amber-text text-darken-3'}
          ></InfoInput>
          <InfoInput title={'Base IRPF:'} value={baseIRPF}></InfoInput>
          <InfoInput
            title={'Desconto IRPF:'}
            value={discountIRPF}
            percentage={percentageDiscountIRPF}
            customClass={'deep-orange-text text-accent-4'}
          ></InfoInput>
          <InfoInput
            title={'Salário Líquido:'}
            value={netSalary}
            percentage={percentageNetSalary}
            customClass={'teal-text'}
          ></InfoInput>
        </div>
        <SalaryStatistics
          discountINSS={percentageDiscountINSS}
          discountIRPF={percentageDiscountIRPF}
          netSalary={percentageNetSalary}
        ></SalaryStatistics>
      </div>
    );
  }
}

export default App;
