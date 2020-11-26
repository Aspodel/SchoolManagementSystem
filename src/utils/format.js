export const formatCurrency = (number) => {
  return new Intl.NumberFormat().format(number);
};
