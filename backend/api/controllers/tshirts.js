const mongoose = require("mongoose");
const path = require("path");

const Tshirt = require("../models/tshirt");

module.exports.tshirtsGetAll = (req, res, next) => {
  Tshirt.find()
    .exec()
    .then((tshirts) => {
      const response = {
        numberOfTshirts: tshirts.length,
        tshirtsAvailable: tshirts.map((tshirt) => {
          // removing _id from stock (for response)
          let stock = [];
          for (entry of tshirt.stock) {
            //   console.log(entry);
            stock.push({
              size: entry.size,
              quantity: entry.quantity,
            });
          }
          return {
            _id: tshirt._id,
            tshirtName: tshirt.tshirtName,
            price: tshirt.price,
            stock: stock,
            image: tshirt.image,
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

module.exports.tshirtsGetById = (req, res, next) => {
  const id = req.params.tshirtId;
  Tshirt.findById(id)
    .exec()
    .then((tshirt) => {
      console.log(tshirt);

      if (tshirt) {
        // removing _id from stock (for response)
        let stock = [];
        for (entry of tshirt.stock) {
          console.log(entry);
          stock.push({
            size: entry.size,
            quantity: entry.quantity,
          });
        }

        res.status(200).json({
          tshirt: {
            _id: tshirt._id,
            tshirtName: tshirt.tshirtName,
            price: tshirt.price,
            stock: stock,
            image: tshirt.image,
          },
        });
      } else {
        res.status(404).json({
          message: "No tshirt with given id",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

module.exports.tshirtsPost = (req, res, next) => {
  Tshirt.findOne({ tshirtName: req.body.tshirtName })
    .exec()
    .then((tshirt) => {
      if (tshirt) {
        return res.status(409).json({
          message:
            "Tshirt with that name exists, change name or use patch request",
        });
      } else {
        const tshirt = new Tshirt({
          _id: new mongoose.Types.ObjectId(),
          tshirtName: req.body.tshirtName,
          stock: req.body.stock,
          price: req.body.price,
          // if we dont send image use default
          image:
            req.file === undefined
              ? "../../assets/images/tshirtDefault.png"
              : req.file.path.split(path.sep).join(path.posix.sep),
        });

        tshirt
          .save()
          .then((result) => {
            console.log(result);

            // removing _id from stock (for response)
            let stock = [];
            for (entry of result.stock) {
              console.log(entry);
              stock.push({
                size: entry.size,
                quantity: entry.quantity,
              });
            }

            res.status(201).json({
              message: "Added tshirt",
              addedTshirt: {
                _id: result._id,
                tshirtName: result.tshirtName,
                stock: stock,
                price: result.price,
                image: result.image,
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

module.exports.tshirtsPatchById = (req, res, next) => {
  const id = req.params.tshirtId;
  const updateOptions = {};
  for (const option of Object.keys(req.body)) {
    updateOptions[option] = req.body[option];
  }

  // console.log(updateOptions);

  // runValidators=true for checking enum
  Tshirt.updateOne(
    { _id: id },
    { $set: updateOptions },
    { runValidators: true }
  )
    .exec()
    .then((result) => {
        console.log(result);
      if (result.nModified == 0) {
        res.status(404).json({
          message: "No tshirt with given id",
        });
      } else {
        // console.log(result);
        res.status(200).json({
          message: "Tshirt updated",
          check: {
            type: "GET",
            url: "http://localhost:3000/tshirts/" + id,
          },
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

module.exports.tshirtsDeleteById = (req, res, next) => {
  const id = req.params.tshirtId;
  Tshirt.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      if (result.deletedCount === 0) {
        res.status(404).json({
          message: "Tshirt with given id not available",
        });
      } else {
        res.status(200).json({
          message: "Tshirt deleted",
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
