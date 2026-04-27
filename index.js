const express = require('express');
const db = require('./src/modules/config/db');
const bcrypt = require('bcrypt');
const joi = require('joi');

const authController = require('./src/modules/auth/routes/authRoutes');


const app = express();
app.use(express.json());

app.use('/auth',authController);


app.listen(3000);