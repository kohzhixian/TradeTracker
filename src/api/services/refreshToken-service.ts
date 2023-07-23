import RefreshToken from '../models/refreshToken-model';

const logout = async (userId:string) => {
    let result;
    try{
        result = await RefreshToken.deleteMany({userId: userId});
    }catch(err){
        throw new Error("UserId not found !!");
    }

    if(result.deletedCount == 0){
        throw new Error("No token found for userId");
    }
}

//This function is just for development purposes
const getAllRefreshTokens = async () => {
    try{
        const result = await RefreshToken.find();
        return result;
    }catch(err){
        throw new Error("No refresh tokens found");
    }
}


export default {logout, getAllRefreshTokens};