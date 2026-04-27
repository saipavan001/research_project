const db = require('../../config/db');
const bcrypt = require('bcrypt');
const authRepo = require('../repositories/authRepositry');
const jwt = require('jsonwebtoken');

const userRegistraionService = async(name,email,password) => {
    const password_hash = await bcrypt.hash(password,10);
    const email_check_query = "SELECT * from users WHERE email = ?";
    const [email_check_qury_execution] = await db.execute(email_check_query,[email]);
    if(email_check_qury_execution.length > 0) {
        throw new Error("Email already registered");
    }else{
        const result = await authRepo.insertUser(name,email,password_hash);
        return result;
    }
}

const userLoginService = async(email,password) => {
            const email_query = "SELECT password_hash,name,id from users where email = ?";
            const [result] = await db.execute(email_query,[email]);
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

                    if(token){
                        return token;
                    }else{
                        throw new Error('the token is not generated')
                    }
                }else{
                    throw new Error ("the Password does't mach with the password enetered");
                }
                
            }
}

module.exports = {userRegistraionService,userLoginService};