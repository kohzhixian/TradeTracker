import { RequestHandler } from "express";
import stockSalesTransactionService from "../services/stockSalesTransaction-service";
import { salesTransactionDTO } from "../../interface/stockSalesTransaction-interface";
import { HttpError } from "../models/http-error";

const createSalesTransaction: RequestHandler = async (req, res, next) => {
  try {
    const result = await stockSalesTransactionService.createSalesTransaction(
      req.body as salesTransactionDTO
    );
    res.json({ salesTransaction: result });
  } catch (err) {
    throw new HttpError(
      "Something went wrong, no sales transaction found",
      500
    );
  }
};

export = { createSalesTransaction };
