const { userModel } = require("../models");
const { matchedData } = require("express-validator");

const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");

const handleHttpError = require("../utils/handleHttpError");

/**
 * ingresar al sistema
 * @param {*} request 
 * @param {*} response 
 */
const login = async (request, response) => {
    try {
        const data = matchedData(request); // la informacion ya curada (email, password)
        const user = await userModel.findOne({ email: data.email }).select("+password"); // incluir la contraseña (SOLO MONGO_DB)
        // const user = await userModel.findOne({ email: data.email }); // buscar el usuario por email
        if (!user) return handleHttpError(response, "USER_NOT_EXIST", 404); // el usuario no existe
        const check = await compare(data.password, user.password); // comparar la contraseña ingresada con la encriptada
        if (!check) return handleHttpError(response, "PASSWORD_INVALID", 401); // la contraseña es incorrecta
        user.set("password", undefined, { strict: false }); // remover la contraseña de la respuesta
        const token = tokenSign(user); // generar el token de sesion
        response.send({ user, token }); // enviar el usuario y el token
    } catch (error) {
        handleHttpError(response, "ERROR_LOGIN_USER");
    }
};

/**
 * registrar un nuevo usuario
 * @param {*} request 
 * @param {*} response 
 */
const register = async (request, response) => {
    try {
        const data = matchedData(request); // la informacion ya curada
        /*
        const password = await encrypt(data.password);
        const user = await userModel.create({ ...data, password });
        response.send({ data });
        */
        data.password = await encrypt(data.password); // encriptar la contraseña
        const user = await userModel.create(data); // registrar el usuario con la contraseña segura
        user.set("password", undefined, { strict: false }); // remover la contraseña de la respuesta
        const token = tokenSign(user); // generar el token de sesion
        response.send({ user, token });
    } catch (error) {
        handleHttpError(response, "ERROR_REGISTER_USER");
    }
};

module.exports = { login, register };