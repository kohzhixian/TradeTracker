// const refreshtokenSchema = require("../models/refreshToken-model");


// const getTokenByUserId = async(userId) => {

// }

// const logout = async (userId) => {
//     let result;
//     try{
//         result = await refreshtokenSchema.deleteMany({userId: userId});
//     }catch(err){
//         throw new Error("UserId not found !!");
//     }

//     if(result.deletedCount == 0){
//         throw new Error("No token found for userId");
//     }
// }

// module.exports = {
//     getTokenByUserId,
//     logout
// }