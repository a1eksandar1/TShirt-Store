const mongoose = require('mongoose');

const shopSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String, 
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Shop", shopSchema);