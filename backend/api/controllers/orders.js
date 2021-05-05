const mongoose = require("mongoose");

const Order = require("../models/order");
const Tshirt = require("../models/tshirt");
const User = require("../models/user");

module.exports.ordersGetAll = (req, res, next) => {
  Order.find()
    .exec()
    .then((orders) => {
      res.status(200).json({
        numberOfOrders: orders.length,
        orders: orders,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

module.exports.ordersGetById = (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
    .exec()
    .then((order) => {
      console.log(order);
      // if exists order with given id
      if (order) {
        res.status(200).json({
          order: {
            _id: order._id,
            tshirtId: order.tshirtId,
            userId: order.userId,
            quantity: order.quantity,
            address: order.address,
            phone: order.phone,
          },
        });
      } else {
        res.status(404).json({
          message: "No order with given id",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

module.exports.ordersPost = (req, res, next) => {
  User.findById(req.body.userId)
    .exec()
    .then((user) => {
      // user id is valid (exists user with give id)
      if (user) {
        Tshirt.findById(req.body.tshirtId)
          .exec()
          .then((tshirt) => {
            // if tshirt is not null (exists tshirt with given id)
            if (tshirt) {
              const order = new Order({
                _id: mongoose.Types.ObjectId(),
                tshirtId: req.body.tshirtId,
                userId: req.body.userId,
                quantity: req.body.quantity,
                address: req.body.address,
                phone: req.body.phone,
              });
              order
                .save()
                .then((result) => {
                  console.log(result);
                  res.status(201).json({
                    message: "Order successful",
                    order: result,
                  });
                })
                .catch((error) => {
                  console.log(error);
                  res.status(500).json({
                    error: error,
                  });
                });
            } else {
              res.status(404).json({
                message: "No tshirt with given id",
              });
            }
          })
          .catch((error) => {
            res.status(500).json({
              error: error,
            });
          });
      } else {
        res.status(404).json({
          message: "No user with given id",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

module.exports.ordersDeleteById = (req, res, next) => {
  const id = req.params.orderId;
  Order.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      if (result.deletedCount === 0) {
        res.status(404).json({
          message: "Order with given id doesnt exist",
        });
      } else {
        res.status(200).json({
          message: "Order deleted",
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
