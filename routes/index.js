const routes = require("express").Router();

const PATH_ROUTES = __dirname;
const { readdirSync } = require("fs");

readdirSync(PATH_ROUTES).forEach(file => {
    if (file !== "index.js") {
        const endpoint = file.slice(0, -3);
        routes.use(`/${endpoint}`, require(`./${file}`))
    }
});

module.exports = routes;