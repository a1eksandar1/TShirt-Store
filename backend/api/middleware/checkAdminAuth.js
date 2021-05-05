const jwt = require("jsonwebtoken");

const User = require("../models/user");

module.exports = (req, res, next) => {
  User.findById(req.userData.userId)
    .exec()
    .then((user) => {
      // exists user with given id
      if (user) {
        if (user.level == "admin") {
          console.log("admin");
          next();
        } else {
          return res.status(401).json({
            message: "Not permitted",
          });
        }
      } else {
        return res.status(404).json({
          message: "User with given id not found",
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
