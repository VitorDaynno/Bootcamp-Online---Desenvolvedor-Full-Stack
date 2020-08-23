import React from 'react';
import styles from '../css/Installment.module.css';

function Installments(props) {
  const { month, value, taxValue, taxPercentage, isNegative } = props;

  return (
    <div className={styles.installment}>
      <div className={styles.month}>
        <span>{month}</span>
      </div>
      <div className={styles.values}>
        <span className={!isNegative ? styles.gain : styles.loss}>{value}</span>{' '}
        <br />
        <span className={!isNegative ? styles.gain : styles.loss}>
          {taxValue}
        </span>{' '}
        <br />
        <span
          className={
            !isNegative ? styles.percentageGain : styles.percentageLoss
          }
        >
          {taxPercentage}
        </span>{' '}
        <br />
      </div>
    </div>
  );
}

export default Installments;
