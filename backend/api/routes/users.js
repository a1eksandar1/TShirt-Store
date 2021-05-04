const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  User.findOne({email: req.body.email})
    .exec()
    .then((user) => {
      if (user) {
        // mail already exists status code 409
        return res.status(409).json({
          message: "Entered mail exists",
        });
      } else {
        User.findOne({ username: req.body.username })
          .exec()
          .then((user) => {
            if (user) {
              // username already exists status code 409
              return res.status(409).json({
                message: "Entered username exists",
              });
            } else {
              bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                  return res.status(500).json({
                    error: err,
                  });
                } else {
                  const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    username: req.body.username,
                    password: hash,
                  });
                  user
                    .save()
                    .then((result) => {
                      console.log(result);
                      res.status(201).json({
                        message: "User created",
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                      res.status(500).json({
                        error: err,
                      });
                    });
                }
              });
            }
          });
      }
    });
});

router.post("/login", (req, res, next) => {
  User.findOne({email: req.body.email})
  .exec()
  .then(user=>{
      if(!user){
          return res.status(401).json({
              message: "login failed"
          });
      }else{
          bcrypt.compare(req.body.password,user.password,(error,result)=>{
            // comparison failed  
            if(error){
                return res.status(401).json({
                    message: "login failed"
                });
              }
              // correct password
              if (result){
                  return res.status(200).json({
                      message: "login successful"
                  })
              // incorrect password
              }else{
                return res.status(401).json({
                    message: "login failed"
                });
              }
          });
      }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  });
});

router.delete('/:userId',(req,res,next)=>{
    User.deleteOne({_id:req.params.userId})
    .exec()
    .then(result=>{
        console.log(result)
        res.status(200).json({
            message:"deleted successfully"
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
    });
});


module.exports = router;
