const userService = require('../services/authService');
const {validationCheck} = require('../validators/authValidator');

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
    }catch(err){
        
        return res.status(500).json({message:err.message});
    }
}

module.exports = {userRegistration};