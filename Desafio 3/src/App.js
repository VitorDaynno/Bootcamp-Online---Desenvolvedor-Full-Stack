import React, { useState } from 'react';

import InputValue from './components/InputValue';
import Installments from './components/Installments';

function App() {
  const [initialAmount, setInitialAmount] = useState(0);
  const [interestMonthly, setInterestMonthly] = useState(0);
  const [period, setPeriod] = useState(0);

  return (
    <div>
      <h3 className="center">React - Juros Compostos</h3>
      <div className="row" style={{ margin: '15px' }}>
        <InputValue
          title={'Montante inicial:'}
          value={initialAmount}
          min={0}
          setValue={setInitialAmount}
        />
        <InputValue
          title={'Taxa de juros mensal:'}
          value={interestMonthly}
          min={-12}
          max={12}
          setValue={setInterestMonthly}
        />
        <InputValue
          title={'Período (meses):'}
          value={period}
          min={1}
          max={36}
          setValue={setPeriod}
        />
      </div>
      <Installments
        initialAmount={initialAmount}
        interestMonthly={interestMonthly}
        period={period}
      />
    </div>
  );
}

export default App;
