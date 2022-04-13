const { Sequelize } = require("sequelize");

const host = process.env.MYSQL_HOST;
const port = process.env.MYSQL_PORT;
const username = process.env.MYSQL_USERNAME;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE;

const options = { dialect: "mysql", ssl: true, host, port };

const sequelize = new Sequelize(database, username, password, options);

// const sequelize = new Sequelize(`mysql://${username}:${password}@${host}:${port}/${database}`, options);

const dbConnectMysql = () => {
    sequelize.authenticate()
        .then(() => console.log("Connected to MySQL database"))
        .catch(error => console.log("Unable to connect to the database:", error))
};

module.exports = { sequelize, dbConnectMysql };