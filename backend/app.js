const express = require('express');
const app = express();

const tshirtsRoutes=require('./api/routes/tshirts.js');

app.use('/tshirts',tshirtsRoutes);

app.use((req,res,next)=>{
    res.status(200).json({
        message: 'ProdavnicaMajica radi?'
    })
});


module.exports = app;