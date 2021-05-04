const express = require('express');
const app = express();

const tshirtsRoutes=require('./api/routes/tshirts.js');
const usersRoutes=require('./api/routes/users.js');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');

    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
        return res.status(200).json({});
    }

    next();
});

app.use('/tshirts',tshirtsRoutes);
app.use('/users',usersRoutes);

app.use((req,res,next)=>{
    res.status(200).json({
        message: 'ProdavnicaMajica radi?'
    })
});


module.exports = app;