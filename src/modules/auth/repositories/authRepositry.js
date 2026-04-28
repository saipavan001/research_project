const db = require('../../config/db');

const insertUser = async(name, email, password_hash) => {
     const query_insert = "INSERT INTO users (name,email,password_hash,role_id) VALUES (?,?,?,?)";
        const [instant_query_execution] = await db.execute(query_insert,[name,email,password_hash,1]);
        return instant_query_execution;
}

const findEmail = async(email) => {
    const email_check_query = "SELECT * from users WHERE email = ?";
    const [email_check_qury_execution] = await db.execute(email_check_query,[email]);
     return email_check_qury_execution;
}

const saveRefreshToken = async(userId, token) => {
    const deleteQuery = await db.execute("DELETE FROM refresh_tokens WHERE user_id = ?",[userId]);
    const query = "INSERT INTO refresh_tokens (user_id,token_hash,expires_at) VALUES (?,?,?)";
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const result = await db.execute(query,[userId,token,expiresAt]); 
    return result;
}

const checkRefreshToken = async(userId)=>{
    const refreshTokenDetails = await db.execute('SELECT token_hash, expires_at from refresh_tokens WHERE user_id=?',[userId]);
    return refreshTokenDetails;
}

module.exports = {insertUser,findEmail,saveRefreshToken,checkRefreshToken};