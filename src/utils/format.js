export const formatCurrency = (number) => {
  return new Intl.NumberFormat().format(number);
};

export const formatDate = (date) => {
  let data = new Date(date);
  return new Intl.DateTimeFormat("en-GB").format(data);
};
