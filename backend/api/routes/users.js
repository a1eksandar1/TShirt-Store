const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");
const checkAdminAuth = require("../middleware/checkAdminAuth");

const usersController = require("../controllers/users");

router.post("/signup", usersController.usersPostSignup);

router.post("/login", usersController.usersPostLogin);

router.delete(
  "/:userId",
  checkAuth,
  checkAdminAuth,
  usersController.usersDeleteById
);

router.get("/", checkAuth, checkAdminAuth, usersController.usersGetAll);

router.patch("/", checkAuth, usersController.usersPatch);

router.post("/:userId/addToWishlist", usersController.usersAddToWishlist);
router.post("/:userId/removeFromWishlist", usersController.usersRemoveFromWishlist);

module.exports = router;
