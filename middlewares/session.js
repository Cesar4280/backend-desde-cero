const { userModel } = require("../models");
const { verifyToken } = require('../utils/handleJwt');

const getProperties = require("../utils/handlePropertiesEngine");
const handleHttpError = require("../utils/handleHttpError");

const properties = getProperties();

const authMiddleware = async (request, response, next) => {
    try {
        const authorization = request.get("Authorization");
        if (!authorization) return handleHttpError(response, "NEED_SESSION", 401);
        const [type, token] = authorization.split(" ");
        if (type !== "Bearer") return handleHttpError(response, "TOKEN_INVALID", 401);
        const payload = verifyToken(token);
        if (!payload) return handleHttpError(response, "TOKEN_INVALID", 401);
        // if (!payload._id) return handleHttpError(response, "ERROR_ID_TOKEN", 401);
        const query = { [properties.id]: payload[properties.id] };
        const user = await userModel.findOne(query);
        if (!user) return handleHttpError(response, "ERROR_ID_USER", 401);
        request.user = user;
        next();
    } catch (error) {
        handleHttpError(response, "NOT_SESSION", 401);
    }
};

module.exports = authMiddleware;