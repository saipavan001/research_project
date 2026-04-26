const route = require('express').Router();
const db = require('../../config/db');
const bcrypt = require('bcrypt');
const {validationCheck} = require('../validators/authValidator');

route.post('/user-registration',async(req,res)=>{
    try{
            const {error,value} = validationCheck.validate(req.body);
            if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
            }
            const { name, email, password } = value;
        
            if(name && email && password){
                const password_hash = await bcrypt.hash(password,10);
                const email_check_query = "SELECT * from users WHERE email = ?";
                const [email_check_qury_execution] = await db.execute(email_check_query,[email]);
                if(email_check_qury_execution.length > 0) {
                   return res.status(400).json({message:"The email is already registered"});
                }else{
                    const query_insert = "INSERT INTO users (name,email,password_hash,role_id) VALUES (?,?,?,?)";
                    const [instant_query_execution] = await db.execute(query_insert,[name,email,password_hash,1]);
                    res.status(201).json({message:"Registration is successfully done",userId:instant_query_execution.insertId});
                }
            }else{
               return res.status(400).json({message:"name, email, password are mandatory"});
            }
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Kindly contact administrator"});
    }
});

module.exports = route;