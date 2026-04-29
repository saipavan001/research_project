const express = require('express');
const authRoutes = require('./src/modules/auth/routes/authRoutes');

const {authMiddleware} = require('./src/modules/auth/middleware/authMiddleware');

const app = express();
app.use(express.json());

app.use('/auth',authRoutes);
app.get('/home',authMiddleware,(req,res)=>{
    res.json({
    message: "Welcome to protected route",
    user: req.user
  });
})


app.listen(3000);