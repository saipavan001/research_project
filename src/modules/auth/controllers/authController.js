const userService = require('../services/authService');
const {validationCheck} = require('../validators/authValidator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../config/db');
const { date } = require('joi');

const userRegistration = async(req,res)=>{
    try{
        const {error,value} = validationCheck.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }
        const { name, email, password } = value;
        if(name && email && password){
            const result = await userService.userRegistraionService(name,email,password);
            res.status(201).json({message:"Registration is successfully done",userId:result.insertId});
        }else{
            return res.status(400).json({message:"name, email, password are mandatory"});
        }
    }
    catch(err){        
        return res.status(500).json({message:err.message});
    }
}

const userLogin = async(req,res)=>{
     try{
        const body = req.body;
        if(body){
            const{email, password} = body;
            const token = await userService.userLoginService(email,password);
            res.status(200).json({token:token[0],refreshToken:token[1]});
        }else{
            throw new Error("the body is empty");   
        }
     }catch(err){
        res.status(402).json({message:err.message});
     }
}

const refresh = async(req,res) => {      
    try{
        const {refreshToken} = req.body;
        if(refreshToken){
            const new_token = userService.refresh(refreshToken);
            res.status(200).json({token:new_token});
        }
    }
    catch(err){
        res.send(500).json({message:err.message});
    }
}

module.exports = {userRegistration,userLogin,refresh};


