const userController = require("./controller");

const express = require("express");
const router = express.Router();
const protect = require("../protectRoute")
const auth = require("../auth")

router.post("/create", protect.protect, userController.createUser);
router.delete("/delete/:id",protect.protect, auth("Admin"), userController.deleteUser);
router.post("/login",  userController.login);
router.post("/search", protect.protect,auth("Admin"), userController.search);

module.exports = router;
