const express = require("express");
const router = express.Router();
const controller = require("../CONTROLLER/userController");
const TokenVerify = require("../middleware/TokenVerify");

router.post("/registration", controller.createuser);

router.post("/login", controller.loginuser);

router.get("/profile", TokenVerify, controller.profile);

router.put("/updateuser", TokenVerify, controller.updateProfile);

router.delete("/deleteproffile", TokenVerify, controller.deleteProfile);

router.get("/getmyNotes", TokenVerify, controller.MyNotes);

module.exports = router;
