require("dotenv").config();

const express = require("express");
const cors = require("cors");

const morganBody = require("morgan-body");
const loggerStream = require("./utils/handleLogger");

const dbConnectMongo = require("./config/mongo");
const { dbConnectMysql } = require("./config/mysql");

const app = express();

app.set("host", process.env.HOST);
app.set("port", process.env.PORT);
app.set("db_engine", process.env.DATABASE_ENGINE);

app.use(cors());
app.use(express.json()); // prepara el body para ser leido como json
app.use(express.static("storage")); // para poder acceder a las imagenes desde el navegador

morganBody(app, { noColors: true, stream: loggerStream, skip: (request, response) => response.statusCode < 400 }); // para monitoriar/interceptar las peticiones criticas

app.use("/api", require("./routes")); // http(s)://localhost:3000/api/...

app.listen(app.get("port"), app.get("host"), () => console.log("Server running at http://%s:%d/", app.get("host"), app.get("port")));

app.get("db_engine") === "SQL" ? dbConnectMysql() : dbConnectMongo(); // conecta con la base de datos correspondiente