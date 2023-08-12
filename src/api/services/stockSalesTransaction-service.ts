import stockSalesTransactionModel from "../models/stockSalesTransaction-model";
import { salesTransactionDTO } from "../../interface/stockSalesTransaction-interface";
import { getFormattedDate, getFormattedNumber } from "../../utils/date-utils";
import { HttpError } from "../models/http-error";
import stockholdingsModel from "../models/stockholdings-model";

const createSalesTransaction = async (
  salesTransactionDTO: salesTransactionDTO
) => {
  //check if there is stockholdings for ticker
  const existingStockHoldingsForTicker = await stockholdingsModel.findOne({
    ticker: salesTransactionDTO.ticker,
  });

  if (!existingStockHoldingsForTicker) {
    throw new HttpError(
      "You do not have any stocksOnHand for this ticker",
      404
    );
  }

  const exitDate = new Date();
  const formattedExitDate = getFormattedDate(exitDate);

  const lastSalesTransaction = await stockSalesTransactionModel
    .findOne({
      exitTransactionID: { $regex: `TXN${formattedExitDate}` },
    })
    .sort({ exitTransactionID: -1 })
    .exec();

  let exitSequenceNumber: number;
  if (!lastSalesTransaction) {
    exitSequenceNumber = 1;
  } else {
    const lastExitTradeId = lastSalesTransaction.exitTransactionID;
    exitSequenceNumber = parseInt(lastExitTradeId.slice(-4)) + 1;
  }

  const formattedExitSequenceNumber = getFormattedNumber(exitSequenceNumber);
  const exitTransactionID = `TXN${formattedExitDate}${formattedExitSequenceNumber}`;

  const newSalesTransaction = new stockSalesTransactionModel({
    ...salesTransactionDTO,
    exitDate,
    exitTransactionID,
  });

  await newSalesTransaction.save();

  if (!newSalesTransaction) {
    throw new HttpError("Failed to create sales transaction", 404);
  }

  const sortedPurchaseTransaction =
    existingStockHoldingsForTicker.purchaseTransaction.sort((a, b) => {
      return a.entryDate < b.entryDate ? 1 : -1;
    });
  const quantityToRemove = 500;
  let remainingToRemove = quantityToRemove;

  for (
    let i = 0;
    i < sortedPurchaseTransaction.length;

  ) {
    if (
      sortedPurchaseTransaction[0].quantity <=
      remainingToRemove
    ) {
      remainingToRemove -= quantityToRemove;
      sortedPurchaseTransaction.splice(i, 1);
    }else{
      sortedPurchaseTransaction[i].quantity -= remainingToRemove;
      remainingToRemove = 0;
      i++;
    }
  }

  if(remainingToRemove <= 0){
    console.log("No more stocks left to sell");
  }

  console.log(sortedPurchaseTransaction);

  return newSalesTransaction;
};

export = { createSalesTransaction };
