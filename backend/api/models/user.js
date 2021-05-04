const mongoose = require('mongoose');

const userSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    username: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    level: {
        type:String,
        default:"user"
    }

});

module.exports=mongoose.model('User',userSchema);