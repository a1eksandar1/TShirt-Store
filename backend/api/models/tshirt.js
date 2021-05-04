const mongoose = require('mongoose');

const tshirtSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tshirtName:{
        type:String,
        required:true
    },
    stock:[{
        size:{
            // ["S","M","L","XL"]
            type:String,
            required:true,
            enum:["S","M","L","XL"]
        },
        quantity:{
            type:Number,
            default:0
        },

    }],
    image:{
        type:String
    },
    price:{
        type:Number,
        required:true
    }

});

module.exports=mongoose.model('Tshirt',tshirtSchema);