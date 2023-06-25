const express = require('express');
const Router = express.Router();
const stockMgmtController = require('../controllers/stock-mgmt-controller');

Router.get('/', stockMgmtController.getAllStocks);
Router.get('/stockname/:stockName', stockMgmtController.getStockByName);
Router.get('/stocksymbol/:stockSymbol', stockMgmtController.getStockBySymbol);

Router.post('/createstock', stockMgmtController.createStock);

module.exports = Router;