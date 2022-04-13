const handleHttpError = (response, message = "Algo sucedio", code = 403) => {
    response.status(code);
    response.send({ error: message });
};

module.exports = handleHttpError;