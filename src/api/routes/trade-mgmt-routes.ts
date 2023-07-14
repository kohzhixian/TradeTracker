import express from "express";
import tradeMgmtController from "../controllers/trade-mgmt-controller";

const router = express.Router();

router.get('/user/:userId', tradeMgmtController.getTradeByUserId);
router.get('/:tradeId', tradeMgmtController.getTradeByTradeId);
router.get('/', tradeMgmtController.getAllTrades);

router.patch('/updatetrade/:tradeId', tradeMgmtController.updateTrade);

export = router;