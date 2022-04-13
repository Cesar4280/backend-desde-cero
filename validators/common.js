const { check } = require("express-validator");
const validateResults = require("../middlewares/handleValidator");

const validatorGetItem = [
    check("id")
        .exists()
        .notEmpty()
        .isMongoId(),
    validateResults
];

module.exports = { validatorGetItem };