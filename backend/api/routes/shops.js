const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");
const checkAdminAuth = require("../middleware/checkAdminAuth");

const shopsController = require("../controllers/shops");

router.get("/", shopsController.shopsGetAll);

router.get(
    "/:shopId",
    checkAuth,
    shopsController.shopsGetById
);

router.post(
    "/",
    checkAuth,
    checkAdminAuth,
    shopsController.shopsPost
);

router.delete(
    "/:shopId",
    checkAuth,
    checkAdminAuth,
    shopsController.shopsDeleteById
);