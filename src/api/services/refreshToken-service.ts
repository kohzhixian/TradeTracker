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


export default {logout};