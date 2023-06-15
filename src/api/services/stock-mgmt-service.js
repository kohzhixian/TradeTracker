const stockMgmtSchema = require('../models/stock-mgmt-model');

const getAllStocks = async () => {
    try{
        const stocks = await stockMgmtSchema.find();
        return stocks;
    }catch(err){
        throw new Error('No stocks found');
    }
}

const getStockByName = async (stockName) => {
    try{
        const stock = await stockMgmtSchema.find({name: stockName});
        return stock;
    }catch(err){
        throw new Error('No stock found with stock name');
    }
}

const getStockBySymbol = async (stockSymbol) => {
    stockSymbol = stockSymbol.toUpperCase();
    try{
        const stock = await stockMgmtSchema.find({ticker: stockSymbol});
        return stock;
    }catch(err){
        throw new Error('No stock found with symbol');
    }
}


module.exports = {
    getAllStocks,
    getStockByName,
    getStockBySymbol
}