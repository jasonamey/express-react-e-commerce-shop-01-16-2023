export const totalPriceCalculation = (items) =>
  items.reduce((sum, item) => sum + item.quantity * item.price, 0);
