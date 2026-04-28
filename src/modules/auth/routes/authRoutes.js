const route = require('express').Router();
const {userRegistration,userLogin,refresh} = require('../controllers/authController');


route.post('/user-registration',userRegistration);
route.post('/user-login',userLogin);
route.post('/refresh',refresh);

module.exports = route;