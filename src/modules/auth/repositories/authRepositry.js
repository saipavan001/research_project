const db = require('../../config/db');

const insertUser = async(name, email, password_hash) => {
     const query_insert = "INSERT INTO users (name,email,password_hash,role_id) VALUES (?,?,?,?)";
        const [instant_query_execution] = await db.execute(query_insert,[name,email,password_hash,1]);
        return instant_query_execution;
}

module.exports = {insertUser};