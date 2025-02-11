
export const calculateTax = (price: number) => price * 0.75;

export const formatUSD = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};
