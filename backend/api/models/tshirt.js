const mongoose = require("mongoose");

const tshirtSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  tshirtName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  comments: [{
    type: String
  }]
});

module.exports = mongoose.model("Tshirt", tshirtSchema);
