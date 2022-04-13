const { check } = require("express-validator");
const validateResults = require("../middlewares/handleValidator");

const validatorCreateItem = [
    check("url")
        .exists()
        .notEmpty()
        .isURL(),
    check("filename")
        .exists()
        .notEmpty(),
    validateResults
];

module.exports = { validatorCreateItem };