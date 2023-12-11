const express = require("express");
const { loginCtrl } = require("../controllers/user");
const router = express.Router();
const { validatorLogin } = require("../validators/auth");

router.post("/login",validatorLogin, loginCtrl);

module.exports = router;