const route = require('express').Router();
const {userRegistration,userLogin} = require('../controllers/authController');


route.post('/user-registration',userRegistration);
route.post('/user-login',userLogin);

module.exports = route;