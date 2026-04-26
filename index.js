const express = require('express');

const app = express();
app.use(express.json());

app.post('/auth/user-registration',(req,res)=>{
    try{
        const body = req.body;
        res.status(200).json(body);
    }catch(err){
        res.status(500).json(err.messaage);
    }
})

app.listen(3000);