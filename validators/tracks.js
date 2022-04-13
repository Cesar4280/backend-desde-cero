const { check } = require("express-validator");
const validateResults = require("../middlewares/handleValidator");

const validatorCreateItem = [
    check("name")
        .exists()
        .notEmpty(),
    /*.isLength({
        min: 3,
        max: 50
    })*/
    check("album")
        .exists()
        .notEmpty(),
    check("cover")
        .exists()
        .notEmpty(),
    check("artist")
        .exists()
        .notEmpty(),
    check("artist.name")
        .exists()
        .notEmpty(),
    check("artist.nickname")
        .exists()
        .notEmpty(),
    check("artist.nationality")
        .exists()
        .notEmpty(),
    check("duration")
        .exists()
        .notEmpty(),
    check("duration.start")
        .exists()
        .notEmpty(),
    check("duration.end")
        .exists()
        .notEmpty(),
    check("mediaId")
        .exists()
        .notEmpty()
        .isMongoId(),
    validateResults
];

module.exports = { validatorCreateItem };