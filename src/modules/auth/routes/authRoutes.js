const route = require('express').Router();
const {userRegistration} = require('../controllers/authController');

route.post('/user-registration',userRegistration);

module.exports = route;