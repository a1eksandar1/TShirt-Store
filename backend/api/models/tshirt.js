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
  ratingSum:{
    type: Number,
    default: 0
  },
  numberOfRatings:{
    type: Number,
    default: 0
  },
  agreeToShow:{
    type: Boolean
  },
  popularity: {
    type: Number,
    default: 0
  },
  comments: [{
    type: String
  }]
});

module.exports = mongoose.model("Tshirt", tshirtSchema);
