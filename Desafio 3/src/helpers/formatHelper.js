const formatToMoney = (value) => {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
  });
};

const formatToIndicator = (value) => {
  return value > 0 ? `+ ${formatToMoney(value)}` : `${formatToMoney(value)}`;
};

const formatPercentage = (value) => {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    style: 'percent',
  });
};

export { formatToMoney, formatToIndicator, formatPercentage };
