const route = require('express').Router();
const {userRegistration,userLogin,refresh,logout} = require('../controllers/authController');


route.post('/user-registration',userRegistration);
route.post('/user-login',userLogin);
route.post('/refresh',refresh);
route.post('/logout',logout);

module.exports = route;