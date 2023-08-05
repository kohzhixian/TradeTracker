import stockSalesTransactionModel from "../models/stockSalesTransaction-model";
import { salesTransactionDTO } from "../../interface/stockSalesTransaction-interface";
import { getFormattedDate, getFormattedNumber } from "../../utils/date-utils";
import { HttpError } from "../models/http-error";

const createSalesTransaction = async (
  salesTransactionDTO: salesTransactionDTO
) => {
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

  return newSalesTransaction;
};

export = { createSalesTransaction };
