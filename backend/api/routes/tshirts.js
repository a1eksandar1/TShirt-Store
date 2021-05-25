const express = require("express");
const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const checkAuth = require("../middleware/checkAuth");
const checkAdminAuth = require("../middleware/checkAdminAuth");

const tshirtsController = require("../controllers/tshirts");

router.get("/", tshirtsController.tshirtsGetAll);

router.get("/:tshirtId", tshirtsController.tshirtsGetById);

router.post(
  "/",
  checkAuth,
  upload.single("image"),
  tshirtsController.tshirtsPost
);

router.post(
  "/:tshirtName",
  checkAuth,
  tshirtsController.tshirtsPostComment
);

router.patch(
  "/:tshirtId",
  checkAuth,
  checkAdminAuth,
  tshirtsController.tshirtsPatchById
);

router.delete(
  "/:tshirtId",
  checkAuth,
  checkAdminAuth,
  tshirtsController.tshirtsDeleteById
);

module.exports = router;
