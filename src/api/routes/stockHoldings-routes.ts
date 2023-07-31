import express from "express";
import stockHoldingsController from "../controllers/stockHoldings-controller";

const router = express.Router();

router.post("/createStockHoldings", stockHoldingsController.createTrade);

// router.get('/', tradeMgmtController.getAllTrades);
// router.get('/:tradeId', tradeMgmtController.getTradeById);
// router.get('/ticker/:ticker', tradeMgmtController.getTradeByTicker);

// router.patch('/updatetrade/:tradeId', tradeMgmtController.updateTrade);

export = router;
