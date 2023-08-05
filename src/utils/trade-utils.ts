import {
  createTradeDTO,
  purchaseTransaction,
} from "../interface/stockHoldings-interface";

export const calculateStockAveragePrice = (
  totalStockPrice: number,
  totalNumberOfStocks: number,
  stockAveragePrice: number,
  createTradeDTO: createTradeDTO,
  purchaseTransaction: purchaseTransaction[]
) => {
  for (const purchase of purchaseTransaction) {
    totalStockPrice += purchase.quantity * purchase.entryPrice;
    totalNumberOfStocks += purchase.quantity;
  }
  totalStockPrice += createTradeDTO.quantity * createTradeDTO.entryPrice;
  totalNumberOfStocks += createTradeDTO.quantity;
  stockAveragePrice = totalStockPrice / totalNumberOfStocks;

  return { stockAveragePrice, totalNumberOfStocks };
};
