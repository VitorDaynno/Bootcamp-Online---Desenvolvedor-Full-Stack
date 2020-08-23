import React, { useState, useEffect } from 'react';

import Installment from './Installment';
import {
  formatToMoney,
  formatToIndicator,
  formatPercentage,
} from '../helpers/formatHelper';

function Installments(props) {
  const { initialAmount, interestMonthly, period } = props;
  const [installments, setInstallments] = useState([]);

  useEffect(() => {
    const installments = [];

    for (let i = 1; i <= period; i++) {
      const value = initialAmount * (1 + interestMonthly / 100) ** i;
      const taxValue = value - initialAmount;
      const taxPercentage = taxValue / initialAmount || 0;

      const entity = {
        value: formatToMoney(value),
        taxValue: formatToIndicator(taxValue),
        taxPercentage: formatPercentage(taxPercentage),
      };

      installments.push(entity);
    }

    setInstallments(installments);
  }, [initialAmount, interestMonthly, period]);

  return (
    <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
      {installments.map((installment, index) => {
        const { value, taxValue, taxPercentage } = installment;
        return (
          <Installment
            key={index}
            month={index + 1}
            value={value}
            taxValue={taxValue}
            taxPercentage={taxPercentage}
            isNegative={interestMonthly < 0}
          />
        );
      })}
    </div>
  );
}

export default Installments;
