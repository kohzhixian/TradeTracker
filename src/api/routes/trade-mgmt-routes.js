const express = require('express');
const router = express.Router();
const trademgmtController = require('../controllers/trade-mgmt-controller');

router.get('/', trademgmtController.getAllTrades);
router.get('/:tradeId', trademgmtController.getTradeByTradeId);
router.get('/user/:userId', trademgmtController.getTradeByUserId);

router.patch('/updatetrade', trademgmtController.updateTrade);

module.exports = router;