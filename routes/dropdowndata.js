const express = require("express");
const { getDropdowndatalist } = require("../controllers/dropdowndata");
const router = express.Router();

router.post("/list",getDropdowndatalist);

module.exports = router;