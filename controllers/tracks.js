const { trackModel } = require("../models");
const { matchedData } = require("express-validator");

const handleHttpError = require("../utils/handleHttpError");

/**
 * Obtiene un registro
 * @param {*} request 
 * @param {*} response 
 */
const getItem = async (request, response) => {
    try {
        const { id } = matchedData(request);
        const data = await trackModel.findOneData(id);
        response.send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(response, "ERROR_GET_ITEM");
    }
};

/**
 * Obtiene una lista de todos los registros
 * @param {*} request 
 * @param {*} response 
 */
const getItems = async (request, response) => {
    try {
        const { user } = request;
        const data = await trackModel.findAllData({});
        response.send({ data, user });
    } catch (error) {
        handleHttpError(response, "ERROR_GET_ITEMS");
    }
};

/**
 * Insertar un registro
 * @param {*} request 
 * @param {*} response 
 */
const createItem = async (request, response) => {
    try {
        const item = matchedData(request);
        const data = await trackModel.create(item);
        response.status(201);
        response.send({ data });
    } catch (error) {
        handleHttpError(response, "ERROR_CREATE_ITEM");
    }
};

/**
 * Actualizar un registro
 * @param {*} request 
 * @param {*} response 
 */
const updateItem = async (request, response) => {
    try {
        const { id, ...item } = matchedData(request); // Obtiene los campos especificados en la validación
        const data = await trackModel.findByIdAndUpdate(id, item, { new: true });
        response.send({ data });
    } catch (error) {
        handleHttpError(response, "ERROR_UPDATE_ITEM");
    }
};

/**
 * Eliminar un registro
 * @param {*} request 
 * @param {*} response 
 */
const deleteItem = async (request, response) => {
    try {
        const { id } = matchedData(request);
        const data = await trackModel.deleteById(id);
        response.send({ data });
    } catch (error) {
        handleHttpError(response, "ERROR_DELETE_ITEM");
    }
};

module.exports = { getItem, getItems, createItem, updateItem, deleteItem };