const express = require("express");
const router = express.Router();


const checkAuth=require("../middleware/checkAuth");
const checkAdminAuth=require("../middleware/checkAdminAuth");

const ordersController=require("../controllers/orders")


router.get("/",checkAuth,checkAdminAuth,ordersController.ordersGetAll);

router.get("/:orderId",checkAuth,checkAdminAuth,ordersController.ordersGetById);

router.post("/",checkAuth, ordersController.ordersPost);


router.delete("/:orderId",checkAuth,checkAdminAuth, ordersController.ordersDeleteById);

module.exports = router;
