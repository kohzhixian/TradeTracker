import express from "express";
import stockMgmtController from "../controllers/stock-mgmt-controller";

const router = express.Router();

router.get("/", stockMgmtController.getAllStocks);
router.get("/search/:searchOption", stockMgmtController.searchStock);
router.get("/ticker/:stockTicker", stockMgmtController.getStockByTicker);
// router.get("/name/:stockName", stockMgmtController.getStockByName);
// router.get("/:stockId", stockMgmtController.getStockById);

router.post("/createstock", stockMgmtController.createStock);

export = router;
