const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

module.exports.usersPostSignup = (req, res, next) => {
  User.findOne({ email: req.body.email })
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
                    level: req.body.level,
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
};

module.exports.usersPostLogin = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Login failed",
        });
      } else {
        bcrypt.compare(req.body.password, user.password, (error, result) => {
          // comparison failed
          if (error) {
            return res.status(401).json({
              message: "Login failed",
            });
          }
          // correct password
          if (result) {
            const token = jwt.sign(
              {
                userId: user._id,
                email: user.email,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: "1d",
              }
            );
            return res.status(200).json({
              message: "Login successful",
              userId: user._id,
              token: token
            });
            // incorrect password
          } else {
            return res.status(401).json({
              message: "Login failed",
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
};

module.exports.usersDeleteById = (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then((result) => {
      if (result.deletedCount === 0) {
        res.status(404).json({
          message: "User with given id doesnt exist",
        });
      } else {
        res.status(200).json({
          message: "Deleted successfully",
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

module.exports.usersGetAll = (req, res, next) => {
  User.find()
    .exec()
    .then((users) => {
      const response = {
        numberOfUsers: users.length,
        usersSignedUp: users.map((user) => {
          return {
            _id: user._id,
            email: user.email,
            username: user.username,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// we get email currentPassword and newPassword
module.exports.usersPatch = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      // exists user with given email
      if (user) {
        bcrypt.compare(
          req.body.currentPassword,
          user.password,
          (error, result) => {
            // comparison failed
            if (error) {
              return res.status(401).json({
                message: "Failed",
              });
            }
            // correct password
            if (result) {
              bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
                if (err) {
                  return res.status(500).json({
                    error: err,
                  });
                } else {
                  user.password = hash;
                  user
                    .save()
                    .then((result) => {
                      return res.status(200).json({
                        message: "Successfully changed password",
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
              // incorrect password
            } else {
              return res.status(401).json({
                message: "Incorrect password",
              });
            }
          }
        );
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};