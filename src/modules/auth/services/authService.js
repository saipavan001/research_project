const db = require('../../config/db');
const bcrypt = require('bcrypt');
const authRepo = require('../repositories/authRepositry');
const jwt = require('jsonwebtoken');

const userRegistraionService = async(name,email,password) => {
    const password_hash = await bcrypt.hash(password,10);
    const email_check_qury_execution = await authRepo.findEmail(email);
    if(email_check_qury_execution.length > 0) {
        throw new Error("Email already registered");
    }else{
        const result = await authRepo.insertUser(name,email,password_hash);
        return result;
    }
}

const userLoginService = async(email,password) => {
            const result = await authRepo.findEmail(email); 
            if(result.length > 0){
                const password_hash = result[0].password_hash;
                const compare = await bcrypt.compare(password,password_hash);
                if(compare){
                    const token = jwt.sign({
                        userId:result[0].id,
                    },
                    process.env.JWT_SECRET,
                    {expiresIn: '15m'}
                    );

                    const refreshToken = jwt.sign({userId:result[0].id},process.env.JWT_REFRESH_SECRET,{expiresIn:"7d"});
                    const refreshTokenHash = await bcrypt.hash(refreshToken,10);
                    const saveRefreshToken = await authRepo.saveRefreshToken(result[0].id,refreshTokenHash);

                    if(token && saveRefreshToken){
                        return [token,refreshToken];
                    }else{
                        throw new Error('the token is not generated')
                    }
                }else{
                    throw new Error ("the Password does't mach with the password enetered");
                }
            }
}

const refresh = async(refreshToken) => {
            const checkRefreshToken = await jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET);
            if(checkRefreshToken){
                const refreshTokenDetails = authRepo.checkRefreshToken(checkRefreshToken.userId);
                
                if(refreshTokenDetails[0].length > 0){
                    const token_hash = refreshTokenDetails[0][0].token_hash;
                    const expires_at = refreshTokenDetails[0][0].expires_at;

                    const refreshTokenCompare = await bcrypt.compare(refreshToken,token_hash);
                    if(refreshTokenCompare){
                        if(new Date() < expires_at){
                            const new_token = jwt.sign({userId:checkRefreshToken.userId},process.env.JWT_SECRET,{expiresIn:'15m'});
                            return new_token;
                            
                        }else{
                            throw new Error("The refresh token is expired");
                        }  
                    }else{
                        throw new Error("The refresh token doest match");
                    }
                }else{
                    throw new Error("The sored refresh token is not found");
                }
            }else{
                throw new Error("Invalid refresh token");
            }
}


const logout = async(refreshToken) => {
    const verifyToken = jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET);
    if(verifyToken){
        const userId = verifyToken.userId;
        const result = await authRepo.logout(userId);
        return result;
    }else{
        throw new Error("The refresh verification is failed.")
    }
}

module.exports = {userRegistraionService,userLoginService,refresh,logout};