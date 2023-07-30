import express from "express";
import tradeMgmtController from "../controllers/trade-mgmt-controller";

const router = express.Router();

router.post('/:userId/:stockId', tradeMgmtController.createTrade);

router.get('/', tradeMgmtController.getAllTrades);
router.get('/:tradeId', tradeMgmtController.getTradeById);
router.get('/ticker/:ticker', tradeMgmtController.getTradeByTicker);

// router.patch('/updatetrade/:tradeId', tradeMgmtController.updateTrade);

export = router;