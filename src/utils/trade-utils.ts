export const calculateEarnings = (
  volume: number,
  price_per_share: number,
  exit_price: number
) => {
  const total_purchase = volume * price_per_share;
  const total_sell_price = volume * exit_price;
  const earnings = total_purchase - total_sell_price;
  return { total_purchase, total_sell_price, earnings };
};
