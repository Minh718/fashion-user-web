export const calculateDiscountedPrice = (price, percent) => {
  return price - (price * percent) / 100;
};
