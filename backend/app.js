const express = require('express');
const app = express();

const tshirtsRoutes=require('./api/routes/tshirts.js');
const usersRoutes=require('./api/routes/users.js');

app.use('/tshirts',tshirtsRoutes);
app.use('/users',usersRoutes);

app.use((req,res,next)=>{
    res.status(200).json({
        message: 'ProdavnicaMajica radi?'
    })
});


module.exports = app;