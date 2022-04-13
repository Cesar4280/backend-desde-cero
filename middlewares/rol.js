const handleHttpError = require("../utils/handleHttpError");

/**
 * Array con los roles permitidos
 * @param {string[]} roles 
 * @returns 
 */
const checkRol = roles => (request, response, next) => {
    try {
        const { user } = request;
        const userRoles = user.role;
        const checkRol = roles.includes(userRoles)// roles.some(rol => userRoles.includes(rol));
        if (!checkRol) return handleHttpError(response, "USER_NOT_PERMISSIONS", 403);
        next();
    } catch (error) {
        handleHttpError(response, "ERROR_PERMISSIONS", 401);
    }
};

module.exports = checkRol;