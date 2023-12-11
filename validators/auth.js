const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator")

const validatorLogin = [
    check("password")
    .exists()
    .notEmpty(),
    check("username")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

module.exports = {validatorLogin};