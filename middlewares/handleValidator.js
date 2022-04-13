const { validationResult } = require("express-validator");

const validateResults = (request, response, next) => {
    try {
        validationResult(request).throw(); // lanza error si falla la validacion
        return next(); // continua hacia el controlador
    } catch (error) {
        response.status(400)
        response.send({ errors: error.array() });
    }
};

module.exports = validateResults;