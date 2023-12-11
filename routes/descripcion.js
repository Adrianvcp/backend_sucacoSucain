const express = require("express");
const { getdescriptionlist } = require("../controllers/descripcion");
const router = express.Router();

router.post("/list",getdescriptionlist);

module.exports = router;