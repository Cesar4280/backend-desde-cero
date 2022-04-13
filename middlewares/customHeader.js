const customHeader = (request, response, next) => {
    try {
        const apiKey = request.headers.api_key;
        console.log(apiKey);
        if (apiKey === "12345") {
            next();
        } else {
            response.status(403);
            response.send({ error: "API_KEY_NO_ES_CORRECTA"});
        }
    } catch (error) {
        response.status(500);
        response.send({ error: "ALGO_OCURRIO_EN_EL_CUSTOM_HEADER" });
    }
};

module.exports = customHeader;