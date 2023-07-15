import trademgmtSchema from '../models/trade-mgmt-model';

const getAllTrades = async () => {
    try{
        const trades = await trademgmtSchema.find();
        return trades;
    }catch(err){
        throw new Error('No trades found');
    }
}

const getTradeByTradeId = async (tradeId:string) => {
    try{
        const trades = await trademgmtSchema.findOne({_id: tradeId});
        return trades;
    }catch(err){
        throw new Error('No trades found'); 
    }
}

const getTradeByUserId = async (userId:string) => {
    try{
        const trades = await trademgmtSchema.find({userId: userId}).populate({
            path: 'stockId',
            select: '-_id'
        });
        return trades;
    }catch(err){
        throw new Error('No trades found');
    }
}

const updateTrade = async (tradeId:string, volume:number) => {
    let existingTrade;
    try{
        existingTrade = await trademgmtSchema.findOne({_id: tradeId});
    }catch(err){
        throw new Error('No Trade found');
    }

    if(!existingTrade){
        throw new Error('No Trade found !!!');
    }
    existingTrade.volume = volume;

    try{
        await existingTrade.save();
    }catch(err){
        throw new Error('cannot update trade');
    }
}

export default {getAllTrades, getTradeByTradeId, getTradeByUserId, updateTrade};