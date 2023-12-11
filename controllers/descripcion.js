const { descripcionModel } = require("../models");
const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");

const getdescriptionlist = async (req, res) => {
  try {
    const data = await descripcionModel.findAll();
    res.send({ data});
  } catch (e) {
    console.log(e)
    handleHttpError(res, "ERROR_GET_INFORME");
  }

};

module.exports = { getdescriptionlist };
