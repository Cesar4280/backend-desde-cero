const { storageModel } = require("../models");
const { matchedData } = require("express-validator");
const { resolve } = require("path");
// const { unlinkSync } = require("fs");

const handleHttpError = require("../utils/handleHttpError");
const { Console } = require("console");

/**
 * Obtiene un registro
 * @param {*} request 
 * @param {*} response 
 */
const getItem = async (request, response) => {
    try {
        const { id } = matchedData(request);
        const data = await storageModel.findById(id);
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
        const data = await storageModel.find({});
        response.send({ data });
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
        const { file: { filename } } = request;
        const url = `${process.env.PUBLIC_URL}/${filename}`;
        const data = await storageModel.create({ filename, url });
        response.send({ data });
    } catch (error) {
        handleHttpError(response, "ERROR_CREATE_ITEM");
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
        const data = await storageModel.findById(id);
        if (data === null) return handleHttpError(response, "ITEM_NOT_FOUND");
        const filePath = resolve("storage", data.filename);
        await storageModel.deleteById(id); // borrado logico del registro
        /**
         * await storageModel.deleteOne({ _id: id }); -> eliminación fisica del registro
         * unlinkSync(filePath); -> eliminación fisica del archivo
         */
        response.send({ filePath, deleted: true });
    } catch (error) {
        handleHttpError(response, "ERROR_DELETE_ITEM");
    }
};

module.exports = { getItem, getItems, createItem, deleteItem };