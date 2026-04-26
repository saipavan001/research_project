const db = require('../../config/db');
const bcrypt = require('bcrypt');
const authRepo = require('../repositories/authRepositry');

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

module.exports = {userRegistraionService};