import express from "express";
import stockMgmtController from "../controllers/stock-mgmt-controller";

const router = express.Router();

router.get('/', stockMgmtController.getAllStocks);
router.get('/stockname/:stockName', stockMgmtController.getStockByName);
router.get('/stockticker/:stockTicker', stockMgmtController.getStockByTicker);

router.post('/createstock', stockMgmtController.createStock);

export = router;
