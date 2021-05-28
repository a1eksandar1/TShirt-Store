const mongoose = require("mongoose");

const nodemailer=require("nodemailer");

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
            isCustomMade: order.isCustomMade,
            size: order.size,
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


module.exports.ordersGetByUserId = (req, res, next) => {
  const id = req.params.userId;
  Order.find({userId: id})
    .exec()
    .then((orders) => {
      console.log(orders);
      // if exists order with given user id
      if (orders) {
        res.status(200).json({
          numOfOrders:orders.length,
          allOrders: orders,
        });
      } else {
        res.status(404).json({
          message: "No order with given user id",
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
                isCustomMade: req.body.isCustomMade,
                size: req.body.size,
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



module.exports.ordersSendEmail= (req, res, next) =>{

  userEmail=req.body.userEmail;

  let transporter = nodemailer.createTransport({
    // host: "",
    service:'gmail',
    // port: 465,
    // secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // send mail with defined transport object
  let mailOptions = {
    from: '"TShirt Shop"<1prodavnicamajca@gmail.com>', // sender address
    to: userEmail, // list of receivers
    subject: "Purchase successful", // Subject line
    text: "Thank you for using our shop.", // plain text body
    // html: "", // html body
  };

  transporter.sendMail(mailOptions,(error,info)=>{
      if(error){
      
        res.status(500).json({
          error: error,
        });
        return console.log(error);

          
      }

      res.status(200).json({
        message: "Mail sent",
      });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
}


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
