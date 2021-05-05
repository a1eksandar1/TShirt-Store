const express = require('express');
const app = express();

const morgan=require('morgan');
const mongoose = require('mongoose');

const tshirtsRoutes=require('./api/routes/tshirts.js');
const usersRoutes=require('./api/routes/users.js');
const ordersRoutes=require('./api/routes/orders.js');

mongoose.connect("mongodb+srv://pveb:"+process.env.MONGO_PASSWORD+"@cluster0.hzcc1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
},
);


app.use(morgan("dev"));

app.use('/assets/images', express.static("./assets/images"));

app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');

    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE');
        return res.status(200).json({});
    }

    next();
});

app.use('/tshirts',tshirtsRoutes);
app.use('/users',usersRoutes);
app.use('/orders',ordersRoutes);

app.use((req,res,next)=>{
    const error=new Error("Not found (wrong endpoint)");
    error.status=404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message: error.message
        }
    });
});


module.exports = app;