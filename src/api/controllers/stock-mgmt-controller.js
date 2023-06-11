const stockMgmtService = require('../services/stock-mgmt-service');

const getAllStocks = async (req, res, next) => {
    const stocks = await stockMgmtService.getAllStocks();
    res.json({stocks: stocks});
}

const getStockByName = async (req, res, next) => {
    const stockName = req.params.stockName;
    const stock = await stockMgmtService.getStockByName(stockName);
    res.json({stock: stock});
}

const getStockBySymbol = async (req, res, next) => {
    const stockSymbol = req.params.stockSymbol;
    const stock = await stockMgmtService.getStockBySymbol(stockSymbol);
    res.json({stock: stock});
}


module.exports = {
    getAllStocks,
    getStockByName,
    getStockBySymbol
}