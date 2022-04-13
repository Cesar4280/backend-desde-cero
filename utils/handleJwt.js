const jwt = require("jsonwebtoken");
const getProperties = require("./handlePropertiesEngine");

const secret = process.env.JWT_SECRET;
const properties = getProperties();

/**
 * Debes de pasar el objeto de usuario
 * @param {object} user 
 * @returns {string} token
 */
const tokenSign = user => {
    const payload = { [properties.id]: user[properties.id], role: user.role };
    const sign = jwt.sign(payload, secret, { expiresIn: "1h" });
    return sign;
};

/**
 * Debes de pasar el token de sesion el jwt
 * @param {string} token 
 * @returns {jwt.JwtPayload | null} payload
 */
const verifyToken = token => {
    try {
        const payload = jwt.verify(token, secret);
        return payload;
    } catch (error) {
        console.log(error.message);
        return null;
    }
};

module.exports = { tokenSign, verifyToken };