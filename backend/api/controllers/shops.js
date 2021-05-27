const mongoose = require("mongoose");

const Order = require("../models/order");
const Tshirt = require("../models/tshirt");
const User = require("../models/user");
const Shop = require("../models/shops");

module.exports.shopsGetAll = (req, res, next) => {
    Shop.find()
    .exec()
    .then((shops) => {
      res.status(200).json({
        numberOfShops: shop.length,
        shops: shops,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

module.exports.shopsGetById = (req, res, next) => {
    const id = req.params.shopId;
    Shop.findById(id)
      .exec()
      .then((shop) => {
        console.log(shop);
        // if exists shop with given id
        if (shop) {
          res.status(200).json({
            shop: {
              _id: shop._id,
              name: shop.name,
              address: shop.address,
            },
          });
        } else {
          res.status(404).json({
            message: "No shop with given id",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  };

  module.exports.shopsPost = (req, res, next) => {
    Shop.findOne({ name: req.body.name })
      .exec()
      .then((shop) => {
        if (shop) {
          return res.status(409).json({
            message:
              "Shop with that name exists, change name or use patch request",
          });
        } else {
          const shop = new shop({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            address: req.body.address
          });
  
          shop
            .save()
            .then((result) => {
              console.log(result);
              res.status(201).json({
                message: "Added shop",
                addedShop: {
                  _id: result._id,
                  name: result.name,
                  address: result.adress
                },
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: err,
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  };
  
  module.exports.shopsDeleteById = (req, res, next) => {
    const id = req.params.shopId;
    Shop.deleteOne({ _id: id })
      .exec()
      .then((result) => {
        if (result.deletedCount === 0) {
          res.status(404).json({
            message: "Shop with given id doesnt exist",
          });
        } else {
          res.status(200).json({
            message: "Shop deleted",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  };