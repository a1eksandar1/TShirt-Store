const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const Tshirt = require("../models/tshirt");




router.get("/", (req, res, next) => {
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
            name: tshirt.tshirtName,
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
});



router.get("/:tshirtId", (req, res, next) => {
  const id = req.params.tshirtId;
  Tshirt.findById(id)
    .exec()
    .then((tshirt) => {
      console.log(tshirt);

      // removing _id from stock (for response)
      let stock = [];
      for (entry of tshirt.stock) {
        console.log(entry);
        stock.push({
          size: entry.size,
          quantity: entry.quantity,
        });
      }

      if (tshirt) {
        res.status(200).json({
          tshirt: {
            _id: tshirt._id,
            tshirtName: tshirt.tshirtName,
            stock: stock,
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
});




router.post("/", (req, res, next) => {
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
                name: result.name,
                stock: stock,
                price: result.price,
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
});

router.patch("/:tshirtId", (req, res, next) => {
    const id = req.params.tshirtId;
    const updateOptions = {};
    for (const option of Object.keys(req.body)) {
      updateOptions[option] = req.body[option];
    }

    // console.log(updateOptions);
    // Tshirt.findOne({"stock.quantity":11}).exec().then(tshirt=>{
    //     console.log("ovde");
    //     console.log(tshirt);
    //     console.log("ovde");
    // }).catch(err=>{
    //     console.log("error");
    // })

    // runValidators=true for checking enum
    Tshirt.updateOne({ _id: id }, { $set: updateOptions },{runValidators:true})
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'Tshirt updated',
            check: {
                type: 'GET',
                url: 'http://localhost:3000/tshirts/' + id
            }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });


  router.delete("/:tshirtId", (req, res, next) => {
    const id = req.params.tshirtId;
    Tshirt.deleteOne({ _id: id })
      .exec()
      .then(result => {
        if(result.deletedCount===0){
            res.status(404).json({
                message: 'Tshirt with given id not available',
            });
        }else{
            res.status(200).json({
                message: 'Tshirt deleted',
           });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });


module.exports = router;
