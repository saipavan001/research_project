
const joi = require('joi');

const validationCheck = joi.object({name:joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().required()
});


module.exports = {validationCheck};