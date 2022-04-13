const { check } = require("express-validator");
const validateResults = require("../middlewares/handleValidator");

const validatorLogin = [
    check("email")
        .exists()
        .notEmpty()
        .isEmail(),
    check("password")
        .exists()
        .notEmpty()
        .isLength({ min: 6, max: 15 })
        .isStrongPassword(),
    validateResults
];

const validatorRegister = [
    check("name")
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 90 }),
    check("age")
        .exists()
        .notEmpty()
        .isInt({ min: 18, max: 90 }),
    ...validatorLogin
];

module.exports = { validatorRegister, validatorLogin };